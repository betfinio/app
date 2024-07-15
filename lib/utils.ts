import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {Config, getBlock} from "@wagmi/core";
import {SupabaseClient} from "@supabase/supabase-js";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}


export async function getBlockByTimestamp(timestamp: number, supabase: SupabaseClient): Promise<bigint> {
	const result = await supabase.functions.invoke("fetchBlocks", {body: {time: timestamp}})
	return result && result.data ? BigInt(result.data) : 0n
}

export async function getTimeByBlock(block: bigint, config: Config): Promise<number> {
	const data = await getBlock(config, {blockNumber: block});
	return Number(data.timestamp);
}