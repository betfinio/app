import type { Options } from '@/lib/types';
import { getBlockByTimestamp } from '@/lib/utils.ts';
import supabase from '@/src/config/supabase.ts';
import { BetsMemoryContract } from '@betfinio/abi';
import { readContract } from '@wagmi/core';
import type { Address } from 'viem';
const BETS_MEMORY_ADDRESS: Address = import.meta.env.PUBLIC_BETS_MEMORY_ADDRESS;
const ROULETTE_ADDRESS: Address = import.meta.env.PUBLIC_ROULETTE_ADDRESS;

export async function fetchRouletteOnline(options: Options): Promise<number> {
	if (!options.config || !options.supabase) return 0;
	const beforeBlock = await getBlockByTimestamp(Math.floor(Date.now() / 1000) - 60 * 60 * 24, supabase);
	const betsCount = (await readContract(options.config, {
		abi: BetsMemoryContract.abi,
		address: BETS_MEMORY_ADDRESS,
		functionName: 'getGamesBetsCount',
		args: [ROULETTE_ADDRESS],
	})) as bigint;
	const beforeBetsCount = (await readContract(options.config, {
		abi: BetsMemoryContract.abi,
		address: BETS_MEMORY_ADDRESS,
		functionName: 'getGamesBetsCount',
		args: [ROULETTE_ADDRESS],
		blockNumber: beforeBlock,
	})) as bigint;
	return Number(betsCount) - Number(beforeBetsCount);
}
