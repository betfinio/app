import { getBetsDifference } from '@/lib/api/shared.ts';
import type { Options } from '@/lib/types';
import { getBlockByTimestamp } from '@/lib/utils.ts';
import supabase from '@/src/config/supabase.ts';
import { LuckyRoundContract } from '@betfinio/abi';
import { type Config, readContract } from '@wagmi/core';
import type { Address } from 'viem';
const LURO_ADDRESS: Address = import.meta.env.PUBLIC_LUCKY_ROUND_ADDRESS;
const LURO_5MIN_ADDRESS: Address = import.meta.env.PUBLIC_LUCKY_ROUND_5MIN_ADDRESS;

export async function fetchLuroOnline(options: Options): Promise<number> {
	if (!options.config || !options.supabase) return 0;
	const online1d = await getBetsOnline(options.config, LURO_ADDRESS);
	const online5m = await getBetsOnline(options.config, LURO_5MIN_ADDRESS);
	return online1d + online5m;
}

export async function fetchLuroLast24h(options: Options): Promise<number> {
	if (!options.config || !options.supabase) return 0;
	const beforeBlock = await getBlockByTimestamp(Math.floor(Date.now() / 1000) - 60 * 60 * 24, supabase);
	const difference1d = await getBetsDifference(options.config, beforeBlock, LURO_ADDRESS);
	const difference5m = await getBetsDifference(options.config, beforeBlock, LURO_5MIN_ADDRESS);

	return difference1d + difference5m;
}

const getBetsOnline = async (config: Config, gameAddress: Address): Promise<number> => {
	const round = await readContract(config, {
		abi: LuckyRoundContract.abi,
		address: gameAddress,
		functionName: 'getCurrentRound',
	});
	return Number(
		await readContract(config, {
			abi: LuckyRoundContract.abi,
			address: gameAddress,
			functionName: 'getBetsCount',
			args: [round],
		}),
	);
};
