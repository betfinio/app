import {useQuery} from "@tanstack/react-query";
import {Address} from "viem";
import {fetchCustomUsername, fetchUsername} from "../api/username";
import {useSupabase} from "@/lib/contexts/supabase";

export const useUsername = (address: Address | undefined) => {
	const {client} = useSupabase()
	return useQuery({
		queryKey: ['app', 'username', address],
		queryFn: () => fetchUsername(address, {supabase: client}),
	})
}
export const useCustomUsername = (address: Address | undefined, user: Address | undefined) => {
	const {client} = useSupabase()
	return useQuery({
		queryKey: ['app', 'username', address, user],
		queryFn: () => fetchCustomUsername(address, user, client!),
	})
}