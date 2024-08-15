import { useSupabase } from '@/lib/contexts/supabase.tsx';
import { useQuery } from '@tanstack/react-query';
import { useConfig } from 'wagmi';
import {fetchRouletteOnline} from "@/lib/api/roulette.ts";

export const useRouletteOnline = () => {
	const config = useConfig();
	const { client } = useSupabase();
	return useQuery<number>({
		queryKey: ['roulette', 'online'],
		queryFn: () => fetchRouletteOnline({ supabase: client, config }),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
};
