import type { Stat, Timeframe } from '@/lib/types/staking';
import { ConservativeStakingContract } from '@betfinio/abi';
import { valueToNumber } from '@betfinio/abi/dist';
import type { SupabaseClient } from '@supabase/supabase-js';
import { readContract } from '@wagmi/core';
import type { Address } from 'viem';
import type { Config } from 'wagmi';

export const fetchTotalStakedStat = async (timeframe: Timeframe, supabase?: SupabaseClient): Promise<Stat[]> => {
	if (!supabase) return [];
	const data = await supabase
		.from(`staking_statistics_view_${timeframe}`)
		.select('time, staked::text')
		.eq('staking', import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS.toLowerCase());
	return (data.data || []).map((e) => ({ time: new Date(e.time).getTime() / 1000, value: valueToNumber(BigInt(e.staked)) }));
};

export const fetchTotalStakersStat = async (timeframe: Timeframe, supabase?: SupabaseClient): Promise<Stat[]> => {
	if (!supabase) return [];

	const data = await supabase
		.from(`staking_statistics_view_${timeframe}`)
		.select('time, stakers::text')
		.eq('staking', import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS.toLowerCase());
	return (data.data || []).map((e) => ({ time: new Date(e.time).getTime() / 1000, value: Number(e.stakers) }));
};
export const fetchTotalProfitStat = async (timeframe: Timeframe, supabase?: SupabaseClient): Promise<Stat[]> => {
	if (!supabase) return [];

	const data = await supabase
		.from(`staking_statistics_view_${timeframe}`)
		.select('time, revenues::text')
		.eq('staking', import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS.toLowerCase());
	return (data.data || []).map((e) => ({ time: new Date(e.time).getTime() / 1000, value: valueToNumber(BigInt(e.revenues)) }));
};

export const fetchTotalStaked = async (config: Config, block?: bigint): Promise<bigint> => {
	return (await readContract(config, {
		abi: ConservativeStakingContract.abi,
		address: import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS as Address,
		functionName: 'totalStaked',
		blockNumber: block || undefined,
	})) as bigint;
};

export const fetchStaked = async (config: Config, address: Address, block?: bigint): Promise<bigint> => {
	return (await readContract(config, {
		abi: ConservativeStakingContract.abi,
		address: import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS as Address,
		functionName: 'getStaked',
		args: [address],
		blockNumber: block || undefined,
	})) as bigint;
};
