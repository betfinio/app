import type { Options } from '@/lib/types';
import { getBlockByTimestamp } from '@/lib/utils.ts';
import supabase from '@/src/config/supabase.ts';
import { BetsMemoryContract } from '@betfinio/abi';
import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

const BETS_MEMORY_ADDRESS: Address = import.meta.env.PUBLIC_BETS_MEMORY_ADDRESS;

const PREDICT_ADDRESS: Address = import.meta.env.PUBLIC_PREDICT_ADDRESS;

export async function fetchPredictOnline(options: Options): Promise<number> {
	if (!options.config || !options.supabase) return 0;
	console.time('fetching predict online');
	const beforeBlock = await getBlockByTimestamp(Math.floor(Date.now() / 1000) - 270 * 4, supabase);
	const betsCount = (await readContract(options.config, {
		abi: BetsMemoryContract.abi,
		address: BETS_MEMORY_ADDRESS,
		functionName: 'getGamesBetsCount',
		args: [PREDICT_ADDRESS],
	})) as bigint;
	const beforeBetsCount = (await readContract(options.config, {
		abi: BetsMemoryContract.abi,
		address: BETS_MEMORY_ADDRESS,
		functionName: 'getGamesBetsCount',
		args: [PREDICT_ADDRESS],
		blockNumber: beforeBlock,
	})) as bigint;
	console.timeEnd('fetching predict online');
	return Number(betsCount) - Number(beforeBetsCount);
}
