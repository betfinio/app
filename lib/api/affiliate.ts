import {defaultTreeMember, Options, TreeMember} from "../types";
import {BetsMemoryContract, ConservativeStakingContract, DynamicStakingContract, ZeroAddress} from "@betfinio/abi";
import {readContract} from "@wagmi/core";
import {Config} from "wagmi";
import {Address} from "viem";

export const fetchTreeMember = async (address: string, options: Options): Promise<TreeMember> => {
	//todo optimize
	if (!options.supabase) throw new Error('Supabase client is not defined');
	if (address === ZeroAddress || !address) return defaultTreeMember;
	const {data} = await options.supabase.from('members')
		.select('inviter, parent, left, right, volumeLeft::text, volumeRight::text, bets::text, volume::text, matchedLeft::text, matchedRight::text, betsLeft::text, betsRight::text, isInviting, isMatching')
		.eq('member', address.toLowerCase()).single<{
			[key: string]: string | boolean
		}>()
	const {data: username} = await options.supabase.from('metadata').select('username').eq('member', address.toLowerCase()).single();
	
	const {count} = await options.supabase.from("members").select('*', {count: 'exact', head: true}).eq('inviter', address.toLowerCase());
	const {data: member} = await options.supabase.from('tree').select('left::text, right::text, id::text').eq('member', address.toLowerCase())
		.single<{ left: string, right: string, id: string }>();
	return {
		member: address.toLowerCase(),
		parent: data?.parent || ZeroAddress,
		inviter: data?.inviter || ZeroAddress,
		left: data?.left || ZeroAddress,
		right: data?.right || ZeroAddress,
		volume: BigInt(data?.volume || 0),
		bets: BigInt(data?.bets || 0),
		volumeLeft: BigInt(data?.volumeLeft || 0),
		volumeRight: BigInt(data?.volumeRight || 0),
		matchedLeft: BigInt(data?.matchedLeft || 0),
		matchedRight: BigInt(data?.matchedRight || 0),
		betsLeft: BigInt(data?.betsLeft || 0),
		betsRight: BigInt(data?.betsRight || 0),
		isMatching: data?.isMatching as boolean,
		isInviting: data?.isInviting as boolean,
		countLeft: BigInt(member?.left || 0),
		countRight: BigInt(member?.right || 0),
		count: count || 0,
		index: BigInt(member?.id || 0),
		username: username?.username
	} as TreeMember
}


export const fetchInviteStakingVolume = async (member: Address, config: Config): Promise<bigint> => {
	const cons = await readContract(config, {
		abi: ConservativeStakingContract.abi,
		address: import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS,
		functionName: 'totalStakesOfInvitees',
		args: [member]
	}) as bigint
	const dyn = await readContract(config, {
		abi: DynamicStakingContract.abi,
		address: import.meta.env.PUBLIC_DYNAMIC_STAKING_ADDRESS,
		functionName: 'totalStakesOfInvitees',
		args: [member]
	}) as bigint
	return cons + dyn;
}

export const fetchInviteBettingVolume = async (member: Address, config: Config): Promise<bigint> => {
	return await readContract(config, {
		abi: BetsMemoryContract.abi,
		address: import.meta.env.PUBLIC_BETS_MEMORY_ADDRESS,
		functionName: 'totalVolumeOfInvitees',
		args: [member]
	}) as bigint
}