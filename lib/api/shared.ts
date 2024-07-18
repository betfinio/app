import {Address} from "viem";
import {Config, getBlock, readContract} from "@wagmi/core";
import {Options} from "@/lib";
import {getContractEvents} from "viem/actions";
import {BetInterfaceContract, BetsMemoryContract, ConservativeStakingContract, DynamicStakingContract} from "@betfinio/abi";
import {BetInterface} from "@betfinio/hooks/dist/types/game";
import {fetchCustomUsername, fetchUsername} from "@/lib/api/username.ts";
import {Stake} from "betfinio_staking/lib/types";

export const fetchLastBets = async (count: number, address: Address, options: Options) => {
	if (!options.config) return []
	const currentBlock = await getBlock(options.config)
	const data = await getContractEvents(options.config.getClient(), {
		abi: BetsMemoryContract.abi,
		address: import.meta.env.PUBLIC_BETS_MEMORY_ADDRESS as Address,
		fromBlock: currentBlock.number - 45000n,
		toBlock: 'latest',
		eventName: 'NewBet',
		strict: true
	})
	// @ts-ignore
	return await Promise.all((data.reverse().slice(0, count)).map(async (bet) => ({...await fetchBetInterface(bet.args.bet, address, options), hash: bet.transactionHash})))
}


export async function fetchBetInterface(address: Address, member: Address, options: Options): Promise<BetInterface> {
	const data = await readContract(options!.config!, {
		abi: BetInterfaceContract.abi,
		address: address as Address,
		functionName: 'getBetInfo',
		args: []
	}) as [Address, Address, bigint, bigint, bigint, bigint];
	const username = await fetchUsername(data[0], options)
	const customUsername = await fetchCustomUsername(member, data[0] as Address, options!.supabase!)
	return {
		address: address,
		player: data[0],
		game: data[1],
		amount: data[2],
		result: data[3],
		status: data[4],
		created: data[5],
		username: username,
		customUsername: customUsername
	} as BetInterface
}

export const fetchPlayerBets = async (count: number, player: Address, options: Options) => {
	if (!options.config) return []
	try {
		const data = await getContractEvents(options.config.getClient(), {
			...BetsMemoryContract,
			eventName: 'NewBet',
			toBlock: 'latest',
			fromBlock: 0n,
			args: {
				player: player
			}
		})
		// @ts-ignore
		return await Promise.all((data.reverse().slice(0, count)).map(async (bet) => ({...await fetchBetInterface(bet.args.bet, player), hash: bet.transactionHash})))
	} catch (e) {
		return []
	}
}


export async function fetchLastStakes(count: number, address: Address, options: Options) {
	console.log('fetchLastStakes', count)
	const conservativeStakesData = await getContractEvents(options.config!.getClient(), {
		abi: ConservativeStakingContract.abi,
		address: import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS as Address,
		eventName: 'Staked',
		fromBlock: 0n,
		toBlock: 'latest'
	})
	const conservativeStakes: Stake[] = conservativeStakesData.map(e => ({
		...e.args,
		staking: import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS,
		hash: e.transactionHash,
		block: Number(e.blockNumber)
	})) as Stake[]
	
	const dynamicStakesData = await getContractEvents(options.config!.getClient(), {
		abi: DynamicStakingContract.abi,
		address: import.meta.env.PUBLIC_DYNAMIC_STAKING_ADDRESS as Address,
		eventName: 'Staked',
		fromBlock: 0n,
		toBlock: 'latest'
	})
	const dynamicStakes: Stake[] = dynamicStakesData.map(e => ({
		...e.args,
		staking: import.meta.env.PUBLIC_DYNAMIC_STAKING_ADDRESS,
		hash: e.transactionHash,
		block: Number(e.blockNumber)
	})) as Stake[]
	return await Promise.all([...conservativeStakes, ...dynamicStakes].sort((a, b) => (b.block || 0) - (a.block || 0)).slice(0, count).map(async (stake) => ({
		...stake,
		username: await fetchUsername(stake.staker, options),
		customUsername: await fetchCustomUsername(address, stake.staker as Address, options.supabase!)
	})))
}


