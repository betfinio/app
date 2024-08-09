import { isMember } from '@/lib/api/pass.ts';
import config from '@/src/config/wagmi';
import { useQuery } from '@tanstack/react-query';
import type { Address } from 'viem';

export const useIsMember = (address: Address | undefined) => {
	return useQuery<boolean>({
		queryKey: ['isMember', address],
		queryFn: () => isMember(address, { config }),
	});
};
