import type { SupabaseClient } from '@supabase/supabase-js';
import { type Config, getBlock } from '@wagmi/core';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function getBlockByTimestamp(timestamp: number, supabase: SupabaseClient): Promise<bigint> {
	const result = await supabase.functions.invoke('fetchBlocks', { body: { time: timestamp } });
	return result?.data ? BigInt(result.data) : 0n;
}

export async function getTimeByBlock(block: bigint, config: Config): Promise<number> {
	const data = await getBlock(config, { blockNumber: block });
	return Number(data.timestamp);
}
