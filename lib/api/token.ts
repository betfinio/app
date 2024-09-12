import type { Options } from '@/lib/types';
import logger from '@/src/config/logger';
import { TokenContract } from '@betfinio/abi';
import { type WriteContractReturnType, writeContract } from '@wagmi/core';
import type { Address } from 'viem';
import { readContract } from 'viem/actions';

export const fetchBalance = async (address: Address | undefined, options: Options, block?: bigint): Promise<bigint> => {
	logger.start('fetchBalance:', address);
	if (!options.config || address === undefined) return 0n;
	const value = (await readContract(options.config.getClient(), {
		abi: TokenContract.abi,
		address: import.meta.env.PUBLIC_TOKEN_ADDRESS,
		functionName: 'balanceOf',
		args: [address],
		blockNumber: block || undefined,
	})) as bigint;
	logger.success('fetchBalance:', value);
	return value;
};

export const fetchAllowance = async (address: Address | undefined, options: Options): Promise<bigint> => {
	logger.start('fetchAllowance:', address);
	if (!options.config || address === undefined) return 0n;
	const value = (await readContract(options.config.getClient(), {
		abi: TokenContract.abi,
		address: import.meta.env.PUBLIC_TOKEN_ADDRESS,
		functionName: 'allowance',
		args: [address, import.meta.env.PUBLIC_CORE_ADDRESS],
	})) as bigint;
	logger.success('fetchAllowance:', value);
	return value;
};

export const increaseAllowance = async (options: Options): Promise<WriteContractReturnType> => {
	if (!options.config) throw new Error('No config provided');
	return await writeContract(options.config, {
		abi: TokenContract.abi,
		address: import.meta.env.PUBLIC_TOKEN_ADDRESS,
		functionName: 'approve',
		args: [import.meta.env.PUBLIC_CORE_ADDRESS, 1_000_000_000_000n * 10n ** 18n],
	});
};
