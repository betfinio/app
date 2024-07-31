import {useSupabase} from "@/lib/contexts/supabase";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Stat, Timeframe} from "@/lib/types/staking";
import {fetchTotalProfit, fetchTotalProfitStat, fetchTotalStaked, fetchTotalStakedStat, fetchTotalStakersStat} from "@/lib/api/dynamic";
import {useConfig, useWatchContractEvent} from "wagmi";
import {DynamicStakingContract} from "@betfinio/abi";


export const useTotalStakedStat = (timeframe: Timeframe) => {
	const {client} = useSupabase()
	return useQuery<Stat[]>({
		queryKey: ['staking', 'dynamic', 'totalStaked', 'stat', timeframe],
		queryFn: () => fetchTotalStakedStat(timeframe, client!)
	})
}
export const useTotalStakersStat = (timeframe: Timeframe) => {
	const {client} = useSupabase()
	return useQuery<Stat[]>({
		queryKey: ['staking', 'dynamic', 'totalStakers', 'stat', timeframe],
		queryFn: () => fetchTotalStakersStat(timeframe, client!)
	})
}
export const useTotalProfitStat = (timeframe: Timeframe) => {
	const {client} = useSupabase()
	return useQuery<Stat[]>({
		queryKey: ['staking', 'dynamic', 'totalProfit', 'stat', timeframe],
		queryFn: () => fetchTotalProfitStat(timeframe, client!)
	})
}
export const useTotalStaked = () => {
	const queryClient = useQueryClient();
	const config = useConfig();
	useWatchContractEvent({
		abi: DynamicStakingContract.abi,
		address: import.meta.env.PUBLIC_DYNAMIC_STAKING_ADDRESS,
		eventName: 'Staked',
		onLogs: async () => {
			await queryClient.invalidateQueries({queryKey: ['staking', 'dynamic']});
		},
	});
	return useQuery<bigint>({
		queryKey: ['staking', 'dynamic', 'totalStaked'],
		queryFn: () => fetchTotalStaked(config),
	});
};

export const useTotalProfit = () => {
	const config = useConfig();
	return useQuery<bigint>({
		queryKey: ['staking', 'dynamic', 'totalProfit'],
		queryFn: () => fetchTotalProfit(config),
	});
};