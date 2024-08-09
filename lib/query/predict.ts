import { fetchPredictOnline } from '@/lib/api/predict';
import { useSupabase } from '@/lib/contexts/supabase';
import { useQuery } from '@tanstack/react-query';
import { useConfig } from 'wagmi';

export const usePredictOnline = () => {
	const config = useConfig();
	const { client } = useSupabase();
	return useQuery<number>({
		queryKey: ['predict', 'online'],
		queryFn: () => fetchPredictOnline({ supabase: client, config }),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
};
