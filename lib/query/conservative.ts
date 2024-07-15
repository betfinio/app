import {useSupabase} from "@/lib/contexts/supabase";
import {useQuery} from "@tanstack/react-query";
import {Stat} from "@/lib/types/staking";
import {fetchTotalProfitStat, fetchTotalStakedStat, fetchTotalStakersStat} from "@/lib/api/conservative";

export const useTotalStakedStat = () => {
	const {client} = useSupabase()
	return useQuery<Stat[]>({
		queryKey: ['staking', 'conservative', 'totalStaked', 'stat'],
		queryFn: () => fetchTotalStakedStat(client!)
	})
}
export const useTotalStakersStat = () => {
	const {client} = useSupabase()
	return useQuery<Stat[]>({
		queryKey: ['staking', 'conservative', 'totalStakers', 'stat'],
		queryFn: () => fetchTotalStakersStat(client!)
	})
}
export const useTotalProfitStat = () => {
	const {client} = useSupabase()
	return useQuery<Stat[]>({
		queryKey: ['staking', 'conservative', 'totalProfit', 'stat',],
		queryFn: () => fetchTotalProfitStat(client!)
	})
}