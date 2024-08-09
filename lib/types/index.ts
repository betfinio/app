import type { SupabaseClient } from '@supabase/supabase-js';
import type { QueryClient } from '@tanstack/react-query';
import type { Config } from 'wagmi';

export interface Options {
	supabase?: SupabaseClient;
	queryClient?: QueryClient;
	config?: Config;
}

export * from './affiliate.ts';
export * from './staking.ts';
