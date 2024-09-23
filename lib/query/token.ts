import { toast } from '@/components/ui/use-toast.ts';
import { fetchAllowance, fetchBalance, increaseAllowance } from '@/lib/api/token';
import { getTransactionLink } from '@/lib/helpers.tsx';
import logger from '@/src/config/logger';
import queryClient from '@/src/config/query.ts';
import config from '@/src/config/wagmi.ts';
import { TokenContract, ZeroAddress } from '@betfinio/abi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { type Address, type Log, type WriteContractErrorType, type WriteContractReturnType, decodeEventLog } from 'viem';
import { waitForTransactionReceipt, watchContractEvent } from 'viem/actions';

export const useBalance = (address: Address | undefined) => {
	useEffect(() => {
		if (!address) return;
		const unwatch = watchContractEvent(config.getClient(), {
			abi: TokenContract.abi,
			address: import.meta.env.PUBLIC_TOKEN_ADDRESS,
			eventName: 'Transfer',
			onLogs: async (log: Log[]) => {
				for (const l of log) {
					const event = decodeEventLog({
						abi: TokenContract.abi,
						...l,
						strict: true,
					});
					const { from, to } = event.args as unknown as { from: string; to: string };
					if (from.toLowerCase() === address?.toLowerCase() || to.toLowerCase() === address?.toLowerCase()) {
						await queryClient.invalidateQueries({ queryKey: ['app', 'account', 'balance', address?.toLowerCase()] });
						await queryClient.invalidateQueries({ queryKey: ['app', 'account', 'allowance', address?.toLowerCase()] });
					}
				}
			},
		});
		return () => unwatch();
	}, [address]);

	return useQuery<bigint>({
		queryKey: ['app', 'account', 'balance', address?.toLowerCase()],
		queryFn: () => fetchBalance(address, { config: config }),
	});
};

export const useAllowance = (address: Address | undefined) => {
	useEffect(() => {
		if (!address || address === ZeroAddress) return;
		const unwatch = watchContractEvent(config.getClient(), {
			abi: TokenContract.abi,
			address: import.meta.env.PUBLIC_TOKEN_ADDRESS,
			eventName: 'Approval',
			onLogs: async (log: Log[]) => {
				const event = decodeEventLog({
					abi: TokenContract.abi,
					...log[0],
					strict: true,
				});
				const { owner } = event.args as unknown as { owner: Address };
				if (owner.toLowerCase() === address?.toLowerCase()) {
					await queryClient.invalidateQueries({ queryKey: ['app', 'account', 'allowance', address?.toLowerCase()] });
				}
			},
		});
		return () => unwatch();
	}, [address]);

	return useQuery<bigint>({
		queryKey: ['app', 'account', 'allowance', address?.toLowerCase()],
		queryFn: () => fetchAllowance(address, { config }),
	});
};

export const useIncreaseAllowance = () => {
	const { t } = useTranslation('shared');
	return useMutation<WriteContractReturnType, WriteContractErrorType, void>({
		mutationKey: ['app', 'account', 'increaseAllowance'],
		mutationFn: () => increaseAllowance({ config }),
		onMutate: () => {
			logger.start('increaseAllowance');
		},
		onError: (e) => {
			logger.error('increaseAllowance');
			logger.error(e);
			// @ts-ignore
			if (e?.cause?.reason) {
				toast({
					title: t('toasts.failedToMintPasses'),
					// @ts-ignore
					description: t(e.cause.reason),
					variant: 'destructive',
				});
			} else {
				toast({
					title: t('errors.unknown'),
					variant: 'destructive',
				});
			}
		},
		onSuccess: async (data) => {
			if (data !== undefined) {
				logger.success('increaseAllowance');
				const { id, update } = toast({
					title: t('toasts.increasingAllowance'),
					description: t('toasts.transactionSubmitted'),
					variant: 'loading',
					duration: 60 * 1000,
				});
				await waitForTransactionReceipt(config.getClient(), {
					hash: data,
				});
				update({
					title: t('toasts.allowanceWasIncreased'),
					description: t('toasts.transactionConfirmed'),
					variant: 'default',
					duration: 5 * 1000,
					id: id,
					action: getTransactionLink(data),
				});
			} else {
				toast({
					title: t('errors.unknown'),
					variant: 'destructive',
				});
			}
		},
	});
};
