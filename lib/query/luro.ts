import { fetchLuroLast24h, fetchLuroOnline } from '@/lib/api/luro.ts';
import { useSupabase } from '@/lib/contexts/supabase.tsx';
import { useQuery } from '@tanstack/react-query';
import { useConfig } from 'wagmi';

export const useLuroOnline = () => {
	const config = useConfig();
	const { client } = useSupabase();
	return useQuery<number>({
		queryKey: ['luro', 'online'],
		queryFn: () => fetchLuroOnline({ supabase: client, config }),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
};

export const useLuroHistorical = () => {
	const config = useConfig();
	const { client } = useSupabase();
	return useQuery<number>({
		queryKey: ['luro', '24h'],
		queryFn: () => fetchLuroLast24h({ supabase: client, config }),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
};
