import { getBetsDifference } from '@/lib/api/shared.ts';
import { getBlockByTimestamp } from '@/lib/gql';
import type { Options } from '@/lib/types';
import supabase from '@/src/config/supabase.ts';
import type { Address } from 'viem';

const ROULETTE_ADDRESS: Address = import.meta.env.PUBLIC_ROULETTE_ADDRESS;

export async function fetchRouletteOnline(options: Options): Promise<number> {
	if (!options.config || !options.supabase) return 0;
	const beforeBlock = await getBlockByTimestamp(Math.floor(Date.now() / 1000) - 60 * 60 * 24, supabase);
	return await getBetsDifference(options.config, beforeBlock, ROULETTE_ADDRESS);
}
