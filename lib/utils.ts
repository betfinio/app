import type { SupabaseClient } from '@supabase/supabase-js';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Address } from 'viem';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function getBlockByTimestamp(timestamp: number, supabase: SupabaseClient): Promise<bigint> {
	const result = await supabase.functions.invoke('fetchBlocks', { body: { time: timestamp } });
	return result?.data ? BigInt(result.data) : 0n;
}

export const addressToColor = (walletAddress: Address) => {
	if (!walletAddress) return '#ffffff';
	const walletHash = walletAddress.substring(2);
	const chunkLength = Math.floor(walletHash.length / 3);
	const [firstChunk, secondChunk, thirdChunk] = [
		walletHash.substring(0, chunkLength),
		walletHash.substring(chunkLength, chunkLength * 2),
		walletHash.substring(chunkLength * 2, walletHash.length),
	];

	const red = Number.parseInt(firstChunk, 16) % 256;
	const green = Number.parseInt(secondChunk, 16) % 256;
	const blue = Number.parseInt(thirdChunk, 16) % 256;
	const result = [red, green, blue].map((color) => `${color < 16 ? '0' : ''}${color.toString(16)}`).join('');
	return `#${result}`;
};

export const isItemVisible = (item: number): boolean => {
	const SIDEBAR = BigInt(import.meta.env.PUBLIC_SIDEBAR || '0') || 0n;

	if (SIDEBAR === 0n || item === 0) return true;

	const itemBigInt = BigInt(item);

	return (SIDEBAR & itemBigInt) !== 0n;
};
