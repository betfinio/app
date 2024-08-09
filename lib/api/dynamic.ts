import type { Stat, Timeframe } from '@/lib/types/staking';
import { DynamicStakingContract, TokenContract } from '@betfinio/abi';
import { valueToNumber } from '@betfinio/abi/dist';
import type { SupabaseClient } from '@supabase/supabase-js';
import { readContract } from '@wagmi/core';
import type { Config } from 'wagmi';

export const fetchTotalStakedStat = async (timeframe: Timeframe, supabase: SupabaseClient | undefined): Promise<Stat[]> => {
	if (!supabase) return [];
	const data = await supabase
		.from(`staking_statistics_view_${timeframe}`)
		.select('time, staked::text')
		.eq('staking', import.meta.env.PUBLIC_DYNAMIC_STAKING_ADDRESS.toLowerCase());
	return (data.data || []).map((e) => ({ time: new Date(e.time).getTime() / 1000, value: valueToNumber(BigInt(e.staked)) }));
};

export const fetchTotalStakersStat = async (timeframe: Timeframe, supabase: SupabaseClient | undefined): Promise<Stat[]> => {
	if (!supabase) return [];

	const data = await supabase
		.from(`staking_statistics_view_${timeframe}`)
		.select('time, stakers::text')
		.eq('staking', import.meta.env.PUBLIC_DYNAMIC_STAKING_ADDRESS.toLowerCase());
	return (data.data || []).map((e) => ({ time: new Date(e.time).getTime() / 1000, value: Number(e.stakers) }));
};
export const fetchTotalProfitStat = async (timeframe: Timeframe, supabase: SupabaseClient | undefined): Promise<Stat[]> => {
	if (!supabase) return [];
	const data = await supabase
		.from(`staking_statistics_view_${timeframe}`)
		.select('time, revenues::text')
		.eq('staking', import.meta.env.PUBLIC_DYNAMIC_STAKING_ADDRESS.toLowerCase());
	return (data.data || []).map((e) => ({ time: new Date(e.time).getTime() / 1000, value: valueToNumber(BigInt(e.revenues)) }));
};

export const fetchTotalStaked = async (config: Config, block?: bigint): Promise<bigint> => {
	const data = await readContract(config, {
		abi: DynamicStakingContract.abi,
		address: import.meta.env.PUBLIC_DYNAMIC_STAKING_ADDRESS,
		functionName: 'totalStaked',
		blockNumber: block || undefined,
	});

	return data as bigint;
};
export const fetchTotalProfit = async (config: Config): Promise<bigint> => {
	const balance = (await readContract(config, {
		abi: TokenContract.abi,
		address: import.meta.env.PUBLIC_TOKEN_ADDRESS,
		functionName: 'balanceOf',
		args: [import.meta.env.PUBLIC_DYNAMIC_STAKING_ADDRESS],
	})) as bigint;
	const realStaked = (await readContract(config, {
		abi: DynamicStakingContract.abi,
		address: import.meta.env.PUBLIC_DYNAMIC_STAKING_ADDRESS,
		functionName: 'realStaked',
	})) as bigint;
	return balance - realStaked;
};
