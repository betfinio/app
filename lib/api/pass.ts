import type { Options } from '@/lib/types';
import { PassContract } from '@betfinio/abi';
import type { Address, WriteContractReturnType } from 'viem';
import { readContract } from 'viem/actions';
import { writeContract } from '@wagmi/core';

export const isMember = async (address: Address | undefined, options: Options): Promise<boolean> => {
	if (!options.config || !address) return false;
	return (
		((await readContract(options.config.getClient(), {
			abi: PassContract.abi,
			address: import.meta.env.PUBLIC_PASS_ADDRESS,
			functionName: 'balanceOf',
			args: [address],
		})) as bigint) > 0n
	);
};

export const mint = async (address: Address, inviter: Address, parent: Address, options: Options): Promise<WriteContractReturnType> => {
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	return await writeContract(options.config!, {
		address: import.meta.env.PUBLIC_PASS_ADDRESS,
		abi: PassContract.abi,
		functionName: 'mint',
		args: [address, inviter, parent],
	});
};
