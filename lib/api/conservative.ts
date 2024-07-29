import {SupabaseClient} from "@supabase/supabase-js";
import {valueToNumber} from "@betfinio/abi/dist";
import {Stat, Timeframe} from "@/lib/types/staking";

export const fetchTotalStakedStat = async (timeframe: Timeframe, supabase: SupabaseClient): Promise<Stat[]> => {
	const data = await supabase
		.from(`staking_statistics_view_${timeframe}`)
		.select("time, staked::text")
		.eq('staking', import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS.toLowerCase())
	return data.data!.map(e => ({time: new Date(e.time).getTime() / 1000, value: valueToNumber(BigInt(e.staked))}));
}

export const fetchTotalStakersStat = async (timeframe: Timeframe, supabase: SupabaseClient): Promise<Stat[]> => {
	const data = await supabase
		.from(`staking_statistics_view_${timeframe}`)
		.select("time, stakers::text")
		.eq('staking', import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS.toLowerCase())
	return data.data!.map(e => ({time: new Date(e.time).getTime() / 1000, value: Number(e.stakers)}));
}
export const fetchTotalProfitStat = async (timeframe: Timeframe, supabase: SupabaseClient): Promise<Stat[]> => {
	const data = await supabase
		.from(`staking_statistics_view_${timeframe}`)
		.select("time, revenues::text")
		.eq('staking', import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS.toLowerCase())
	return data.data!.map(e => ({time: new Date(e.time).getTime() / 1000, value: valueToNumber(BigInt(e.revenues))}));
}