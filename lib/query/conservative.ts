import {useSupabase} from "@/lib/contexts/supabase";
import {useQuery} from "@tanstack/react-query";
import {Stat, Timeframe} from "@/lib/types/staking";
import {fetchTotalProfitStat, fetchTotalStakedStat, fetchTotalStakersStat} from "@/lib/api/conservative";

export const useTotalStakedStat = (timeframe: Timeframe) => {
	const {client} = useSupabase()
	return useQuery<Stat[]>({
		queryKey: ['staking', 'conservative', 'totalStaked', 'stat', timeframe],
		queryFn: () => fetchTotalStakedStat(timeframe, client!),
	})
}
export const useTotalStakersStat = (timeframe: Timeframe) => {
	const {client} = useSupabase()
	return useQuery<Stat[]>({
		queryKey: ['staking', 'conservative', 'totalStakers', 'stat', timeframe],
		queryFn: () => fetchTotalStakersStat(timeframe, client!)
	})
}
export const useTotalProfitStat = (timeframe: Timeframe) => {
	const {client} = useSupabase()
	return useQuery<Stat[]>({
		queryKey: ['staking', 'conservative', 'totalProfit', 'stat', timeframe],
		queryFn: () => fetchTotalProfitStat(timeframe, client!)
	})
}