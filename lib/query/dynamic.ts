import {useSupabase} from "@/lib/contexts/supabase";
import {useQuery} from "@tanstack/react-query";
import {Stat} from "@/lib/types/staking";
import {fetchTotalProfitStat, fetchTotalStakedStat, fetchTotalStakersStat} from "@/lib/api/dynamic";

export const useTotalStakedStat = () => {
	const {client} = useSupabase()
	return useQuery<Stat[]>({
		queryKey: ['staking', 'dynamic', 'totalStaked', 'stat'],
		queryFn: () => fetchTotalStakedStat(client!)
	})
}
export const useTotalStakersStat = () => {
	const {client} = useSupabase()
	return useQuery<Stat[]>({
		queryKey: ['staking', 'dynamic', 'totalStakers', 'stat'],
		queryFn: () => fetchTotalStakersStat(client!)
	})
}
export const useTotalProfitStat = () => {
	const {client} = useSupabase()
	return useQuery<Stat[]>({
		queryKey: ['staking', 'dynamic', 'totalProfit', 'stat',],
		queryFn: () => fetchTotalProfitStat(client!)
	})
}