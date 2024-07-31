import {useSupabase} from "@/lib/contexts/supabase";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Stat, Timeframe} from "@/lib/types/staking";
import {fetchTotalProfitStat, fetchTotalStaked, fetchTotalStakedStat, fetchTotalStakersStat} from "@/lib/api/conservative";
import {useConfig, useWatchContractEvent} from "wagmi";
import {ConservativeStakingContract} from "@betfinio/abi";
import {Address} from "viem";

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

export const useTotalStaked = () => {
	const queryClient = useQueryClient();
	const config = useConfig();
	useWatchContractEvent({
		abi: ConservativeStakingContract.abi,
		eventName: 'Staked',
		onLogs: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['staking', 'conservative', 'totalStaked'],
			});
			await queryClient.invalidateQueries({
				queryKey: ['staking', 'conservative', 'totalStakers'],
			});
		},
	});
	useWatchContractEvent({
		abi: ConservativeStakingContract.abi,
		address: import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS as Address,
		eventName: 'Withdraw',
		onLogs: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['staking', 'conservative', 'totalStaked'],
			});
			await queryClient.invalidateQueries({
				queryKey: ['staking', 'conservative', 'totalStakers'],
			});
		},
	});
	return useQuery<bigint>({
		queryKey: ['staking', 'conservative', 'totalStaked'],
		queryFn: () => fetchTotalStaked(config),
	});
};