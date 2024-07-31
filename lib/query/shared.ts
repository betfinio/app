import {BetInterface} from "@betfinio/hooks/dist/types/game";
import {ZeroAddress} from "@betfinio/abi";
import {useAccount, useConfig} from "wagmi";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchLastBets, fetchPlayerBets, fetchLastStakes, fetchMemberSide, fetchRegistrationDate} from "@/lib/api/shared.ts";
import {useSupabase} from "@/lib/contexts/supabase.tsx";
import {Stake} from "@/lib/types";
import {useEffect, useState} from "react";
import {Address} from "viem";

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
const useAllStakes = (count: number) => {
	const config = useConfig()
	const {client} = useSupabase()
	const {address = ZeroAddress} = useAccount()
	return useQuery<Stake[]>({
		queryKey: ['stakes', 'last', count],
		refetchOnWindowFocus: false,
		queryFn: () => fetchLastStakes(count, address, {supabase: client, config})
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

const useOpenProfile = () => {
	const {address: account} = useAccount()
	const queryClient = useQueryClient()
	const [isOpen, setOpen] = useState(false)
	const [address, setAddress] = useState<Address | undefined>(account)
	
	const getOpen = () => {
		console.log('fet', isOpen)
		return {open: isOpen, address}
	}
	
	useEffect(() => {
		console.log('eff', isOpen)
	}, [isOpen]);
	
	const open = (address: Address) => {
		console.log('open')
		setOpen(true)
		setAddress(address);
		queryClient.setQueryData(['profile'], {open: true, address})
	}
	
	function close() {
		console.log('close')
		setOpen(false)
		queryClient.setQueryData(['profile'], {open: false})
	}
	
	return {
		...useQuery({
			initialData: {open: false, address: account},
			queryKey: ['profile'],
			queryFn: getOpen
		}), open, close
	}
}


const useSide = (parent: Address, member: Address) => {
	const {client} = useSupabase()
	return useQuery({
		initialData: null,
		queryKey: ['profile', 'side', parent, member],
		queryFn: () => fetchMemberSide(parent, member, client!)
	})
}
export const useRegistrationDate = (address: Address) => {
	const config = useConfig()
	return useQuery<number>({
		queryKey: ['profile', 'registration', address],
		queryFn: () => fetchRegistrationDate(address, config)
	})
}
export {useBets, usePlayerBets, useAllStakes, useOpenProfile, useSide};



