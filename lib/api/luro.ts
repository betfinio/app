import type { Options } from '@/lib/types';
import { LuckyRoundContract } from '@betfinio/abi';
import { readContract } from '@wagmi/core';
import type { Address } from 'viem';
const LURO_ADDRESS: Address = import.meta.env.PUBLIC_LUCKY_ROUND_ADDRESS;

export async function fetchLuroOnline(options: Options): Promise<number> {
	if (!options.config || !options.supabase) return 0;
	const round = await readContract(options.config, {
		abi: LuckyRoundContract.abi,
		address: LURO_ADDRESS,
		functionName: 'getCurrentRound',
	});
	return Number(
		await readContract(options.config, {
			abi: LuckyRoundContract.abi,
			address: LURO_ADDRESS,
			functionName: 'getBetsCount',
			args: [round],
		}),
	);
}
