import { BlockByTimestampDocument, type BlockByTimestampQuery, GetMemberDocument, type GetMemberQuery, execute } from '@/.graphclient';
import logger from '@/src/config/logger';
import type { ExecutionResult } from 'graphql/execution';
import type { Address } from 'viem';

export const fetchRegistrationDate = async (address: Address) => {
	logger.start('fetching registration date');
	const data: ExecutionResult<GetMemberQuery> = await execute(GetMemberDocument, { member: address });
	logger.success('fetching registration date', data.data?.newMembers.length);
	if (!data.data || data.data.newMembers.length === 0) {
		return 0;
	}
	return Number(data.data.newMembers[0].blockTimestamp) * 1000;
};

export const getBlockByTimestamp = async (timestamp: number): Promise<bigint> => {
	logger.start('Fetching block by timestamp');
	const data: ExecutionResult<BlockByTimestampQuery> = await execute(BlockByTimestampDocument, { timestamp });
	logger.success('Fetching block by timestamp', data.data?.blocks);
	if (!data.data || data.data.blocks.length === 0) {
		return 0n;
	}
	return BigInt(data.data.blocks[0].number as bigint);
};
