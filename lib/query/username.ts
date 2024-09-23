import { toast } from '@/components/ui/use-toast.ts';
import { useSupabase } from '@/lib/contexts/supabase';
import { ZeroAddress } from '@betfinio/abi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { Address } from 'viem';
import { useAccount, useSignMessage } from 'wagmi';
import { fetchCustomUsername, fetchUsername, saveCustomUsername, saveUsername } from '../api/username';

export const useUsername = (address: Address | undefined) => {
	const { client } = useSupabase();
	return useQuery({
		queryKey: ['app', 'username', address],
		queryFn: () => fetchUsername(address, { supabase: client }),
	});
};
export const useCustomUsername = (address: Address | undefined, user: Address | undefined) => {
	const { client } = useSupabase();
	return useQuery({
		queryKey: ['app', 'username', address, user],
		queryFn: () => fetchCustomUsername(address, user, client),
	});
};

export const useChangeUsername = () => {
	const { client } = useSupabase();
	const { address: me = ZeroAddress } = useAccount();
	const { t } = useTranslation('shared', { keyPrefix: 'errors' });
	const queryClient = useQueryClient();
	const { signMessageAsync } = useSignMessage();
	return useMutation({
		mutationKey: ['app', 'username', 'change'],
		mutationFn: (username: string) => saveUsername(username, me, signMessageAsync, { supabase: client, queryClient }),
		onError: (e) => {
			if (e.message) {
				toast({
					title: 'Failed to save username',
					description: e.message,
					variant: 'destructive',
				});
			} else {
				toast({
					title: t('unknown'),
					variant: 'destructive',
				});
			}
		},
		onSettled: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ['app', 'username'] });
			if (data) {
				toast({
					title: 'Username changed',
					variant: 'default',
				});
			}
		},
	});
};

export const useChangeCustomUsername = () => {
	const { client: supabase } = useSupabase();
	const { t } = useTranslation('shared', { keyPrefix: 'errors' });
	const { signMessageAsync } = useSignMessage();
	const queryClient = useQueryClient();
	const { address: me = ZeroAddress } = useAccount();
	return useMutation<boolean, Error, { username: string; address: Address }>({
		mutationKey: ['affiliate', 'member', 'change', 'username'],
		mutationFn: async ({ username, address }) => saveCustomUsername(username, address, me, signMessageAsync, { supabase, queryClient }),
		onError: (e) => {
			if (e.message) {
				toast({
					title: 'Failed to save username',
					description: e.message,
					variant: 'destructive',
				});
			} else {
				toast({
					title: t('unknown'),
					variant: 'destructive',
				});
			}
		},
		onSettled: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ['app', 'username'] });
			if (data) {
				toast({
					title: 'Username changed',
					variant: 'default',
				});
			}
		},
	});
};
