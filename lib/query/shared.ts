import {BetInterface} from "@betfinio/hooks/dist/types/game";
import {ZeroAddress} from "@betfinio/abi";
import {useAccount, useConfig} from "wagmi";
import {useQuery} from "@tanstack/react-query";
import {fetchLastBets, fetchPlayerBets, fetchLastStakes} from "@/lib/api/shared.ts";
import {useSupabase} from "@/lib/contexts/supabase.tsx";
import {Stake} from "betfinio_staking/lib/types";

const useBets = (count: number) => {
	const {client} = useSupabase()
	const config = useConfig()
	const {address = ZeroAddress} = useAccount()
	
	return useQuery<BetInterface[]>({
		queryKey: ['bets', 'last', count],
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		queryFn: () => fetchLastBets(count, address, {config, supabase: client}),
	})
}


const usePlayerBets = (count: number) => {
	const {client} = useSupabase()
	const config = useConfig()
	const {address = ZeroAddress} = useAccount()
	
	return useQuery<BetInterface[]>({
		queryKey: ['bets', 'last', count, address],
		refetchOnWindowFocus: false,
		queryFn: () => fetchPlayerBets(count, address, {config, supabase: client}),
	})
}
export {useBets, usePlayerBets};


export const useAllStakes = (count: number) => {
	const config = useConfig()
	const {client} = useSupabase()
	const {address = ZeroAddress} = useAccount()
	return useQuery<Stake[]>({
		queryKey: ['stakes', 'last', count],
		refetchOnWindowFocus: false,
		queryFn: () => fetchLastStakes(count, address, {supabase: client, config})
	})
}
