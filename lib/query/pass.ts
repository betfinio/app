import { toast } from '@/components/ui/use-toast.ts';
import { isMember, mint } from '@/lib/api/pass.ts';
import { getTransactionLink } from '@/lib/helpers.tsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { Address, WriteContractReturnType } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import { useConfig } from 'wagmi';

export const useIsMember = (address: Address | undefined) => {
	const config = useConfig();
	return useQuery<boolean>({
		queryKey: ['isMember', address],
		queryFn: () => isMember(address, { config }),
	});
};

export const useMint = () => {
	const config = useConfig();
	const { t } = useTranslation('shared');
	return useMutation<WriteContractReturnType, unknown, { address: Address; inviter: Address; parent: Address }>({
		mutationKey: ['mint'],
		mutationFn: (params) => mint(params.address, params.inviter, params.parent, { config }),
		onError: (e) => {
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
				const { id, update } = toast({
					title: t('toasts.mintingAPass'),
					description: t('toasts.transactionSubmitted'),
					variant: 'loading',
					duration: 60 * 1000,
				});
				await waitForTransactionReceipt(config.getClient(), {
					hash: data,
				});
				update({
					title: t('toasts.passWasMinted'),
					description: t('toasts.transactionSubmitted'),
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
