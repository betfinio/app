import type { SupabaseClient } from '@supabase/supabase-js';
import { type Config, getBlock } from '@wagmi/core';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {Address} from "viem";

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

export function hexToRgbA(hex: string) {
	let c: string | string[];
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length === 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = `0x${c.join('')}`;
		return `rgba(${[(Number.parseInt(c, 16) >> 16) & 255, (Number.parseInt(c, 16) >> 8) & 255, Number.parseInt(c, 16) & 255].join(',')},1)`;
	}
	throw new Error('Bad Hex');
}
