import {useQuery} from "@tanstack/react-query";
import {fetchPredictOnline} from "@/lib/api/predict";
import {useConfig} from "wagmi";
import {useSupabase} from "@/lib/contexts/supabase";

export const usePredictOnline = () => {
	const config = useConfig()
	const {client} = useSupabase()
	return useQuery<number>({
		queryKey: ['predict', 'online'],
		queryFn: () => fetchPredictOnline({supabase: client, config})
	})
}