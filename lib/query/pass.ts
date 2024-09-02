import { isMember, mint } from '@/lib/api/pass.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { Address, WriteContractReturnType } from 'viem';
import { useConfig } from 'wagmi';
import { toast } from '@/components/ui/use-toast.ts';
import { waitForTransactionReceipt } from 'viem/actions';
import { getTransactionLink } from '@/lib/helpers.tsx';
import { useTranslation } from 'react-i18next';

export const useIsMember = (address: Address | undefined) => {
	const config = useConfig();
	return useQuery<boolean>({
		queryKey: ['isMember', address],
		queryFn: () => isMember(address, { config }),
	});
};

export const useMint = () => {
	const config = useConfig();
	const { t } = useTranslation('', { keyPrefix: 'shared.errors' });
	return useMutation<WriteContractReturnType, unknown, { address: Address; inviter: Address; parent: Address }>({
		mutationKey: ['mint'],
		mutationFn: (params) => mint(params.address, params.inviter, params.parent, { config }),
		onError: (e) => {
			// @ts-ignore
			if (e?.cause?.reason) {
				toast({
					title: 'Failed to mint passes',
					// @ts-ignore
					description: t(e.cause.reason),
					variant: 'destructive',
				});
			} else {
				toast({
					title: t('unknown'),
					variant: 'destructive',
				});
			}
		},
		onSuccess: async (data) => {
			if (data !== undefined) {
				const { id, update } = toast({
					title: 'Minting a pass',
					description: 'Transaction submitted',
					variant: 'loading',
					duration: 60 * 1000,
				});
				await waitForTransactionReceipt(config.getClient(), {
					hash: data,
				});
				update({
					title: 'Pass was minted',
					description: 'Transaction confirmed',
					variant: 'default',
					duration: 5 * 1000,
					id: id,
					action: getTransactionLink(data),
				});
			} else {
				toast({
					title: t('unknown'),
					variant: 'destructive',
				});
			}
		},
	});
};
