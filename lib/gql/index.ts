import { GetMemberDocument, type GetMemberQuery, execute } from '@/.graphclient';
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
