import { getBetsDifference } from '@/lib/api/shared.ts';
import { getBlockByTimestamp } from '@/lib/gql';
import type { Options } from '@/lib/types';
import supabase from '@/src/config/supabase.ts';
import { GameContract } from '@betfinio/abi';
import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

const PREDICT_ADDRESS: Address = import.meta.env.PUBLIC_PREDICT_ADDRESS;
const PREDICT_GAME_ADDRESS: Address = import.meta.env.PUBLIC_BTCUSDT_GAME_ADDRESS;

export async function fetchPredictOnline(options: Options): Promise<number> {
	if (!options.config || !options.supabase) return 0;
	const currentRoundBets = (await readContract(options.config, {
		abi: GameContract.abi,
		address: PREDICT_GAME_ADDRESS,
		functionName: 'getRoundBets',
		args: [0n],
	})) as unknown[];
	return Number(currentRoundBets[0]);
}

export async function fetchPredictLast24h(options: Options): Promise<number> {
	if (!options.config || !options.supabase) return 0;
	const beforeBlock = await getBlockByTimestamp(Math.floor(Date.now() / 1000) - 60 * 60 * 24, supabase);
	return await getBetsDifference(options.config, beforeBlock, PREDICT_ADDRESS);
}
