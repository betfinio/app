import { useConfig } from 'wagmi';
import { useSupabase } from '@/lib/contexts/supabase.tsx';
import { useQuery } from '@tanstack/react-query';
import { fetchLuroOnline } from '@/lib/api/luro.ts';

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
