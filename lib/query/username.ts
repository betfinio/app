import {useQuery} from "@tanstack/react-query";
import {Address} from "viem";
import {fetchUsername} from "../api/username";
import {useSupabase} from "@/lib/contexts/supabase";

export const useUsername = (address: Address | undefined) => {
	const {client} = useSupabase()
	return useQuery({
		queryKey: ['app', 'username', address],
		queryFn: () => fetchUsername(address, {supabase: client}),
	})
}