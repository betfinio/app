import type { BetInterface, Options, Stake } from '@/lib/types';
import { BetInterfaceContract, BetsMemoryContract, ConservativeStakingContract, DynamicStakingContract } from '@betfinio/abi';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getBlock, readContract } from '@wagmi/core';
import type { Address } from 'viem';
import { getContractEvents } from 'viem/actions';

export const fetchLastBets = async (count: number, address: Address, options: Options) => {
	if (!options.config) return [];
	const currentBlock = await getBlock(options.config);
	const data = await getContractEvents(options.config.getClient(), {
		abi: BetsMemoryContract.abi,
		address: import.meta.env.PUBLIC_BETS_MEMORY_ADDRESS as Address,
		fromBlock: currentBlock.number - 45000n,
		toBlock: 'latest',
		eventName: 'NewBet',
		strict: true,
	});
	return await Promise.all(
		data
			.reverse()
			.slice(0, count)
			// @ts-ignore
			.map(async (bet) => ({ ...(await fetchBetInterface(bet.args.bet, address, options)), hash: bet.transactionHash })),
	);
};

export async function fetchBetInterface(address: Address, member: Address, options: Options): Promise<BetInterface> {
	if (!options.config) throw new Error('Config not found');
	if (!options.supabase) throw new Error('Supabase not found');
	const data = (await readContract(options.config, {
		abi: BetInterfaceContract.abi,
		address: address as Address,
		functionName: 'getBetInfo',
		args: [],
	})) as [Address, Address, bigint, bigint, bigint, bigint];
	return {
		address: address,
		player: data[0],
		game: data[1],
		amount: data[2],
		result: data[3],
		status: data[4],
		created: data[5],
	} as BetInterface;
}

export const fetchPlayerBets = async (count: number, player: Address, options: Options) => {
	if (!options.config) return [];
	try {
		const data = await getContractEvents(options.config.getClient(), {
			...BetsMemoryContract,
			eventName: 'NewBet',
			toBlock: 'latest',
			fromBlock: 0n,
			args: {
				player: player,
			},
		});
		return await Promise.all(
			data
				.reverse()
				.slice(0, count)
				// @ts-ignore
				.map(async (bet) => ({ ...(await fetchBetInterface(bet.args.bet, player, options)), hash: bet.transactionHash })),
		);
	} catch (e) {
		return [];
	}
};

export async function fetchLastStakes(count: number, address: Address, options: Options) {
	if (!options.config || !options.supabase) return [];
	const conservativeStakesData = await getContractEvents(options.config.getClient(), {
		abi: ConservativeStakingContract.abi,
		address: import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS as Address,
		eventName: 'Staked',
		fromBlock: 0n,
		toBlock: 'latest',
	});
	const conservativeStakes: Stake[] = conservativeStakesData.map((e) => ({
		...e.args,
		staking: import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS,
		hash: e.transactionHash,
		block: Number(e.blockNumber),
	})) as Stake[];

	const dynamicStakesData = await getContractEvents(options.config?.getClient(), {
		abi: DynamicStakingContract.abi,
		address: import.meta.env.PUBLIC_DYNAMIC_STAKING_ADDRESS as Address,
		eventName: 'Staked',
		fromBlock: 0n,
		toBlock: 'latest',
	});
	const dynamicStakes: Stake[] = dynamicStakesData.map((e) => ({
		...e.args,
		staking: import.meta.env.PUBLIC_DYNAMIC_STAKING_ADDRESS,
		hash: e.transactionHash,
		block: Number(e.blockNumber),
	})) as Stake[];
	return await Promise.all([...conservativeStakes, ...dynamicStakes].sort((a, b) => (b.block || 0) - (a.block || 0)).slice(0, count));
}

export const fetchMemberSide = async (parent: Address, member: Address, supabase: SupabaseClient | undefined): Promise<'left' | 'right' | null> => {
	if (!supabase) return null;
	if (parent === member) return null;
	const { data: result, count } = await supabase.rpc('find_parent', { member: member.toLowerCase(), parent: parent.toLowerCase() }, { count: 'exact' });
	if (count === 0) return null;
	if (count === 1) {
		return result[0].side === 2 ? 'right' : result[0].side === 1 ? 'left' : null;
	}
	return null;
};
