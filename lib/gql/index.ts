import { GetMemberDocument, type GetMemberQuery, execute } from '@/.graphclient';
import logger from '@/src/config/logger';
import type { ExecutionResult } from 'graphql/execution';
import type { Address } from 'viem';

export const fetchRegistrationDate = async (address: Address) => {
	logger.start('fetching registration date');
	const data: ExecutionResult<GetMemberQuery> = await execute(GetMemberDocument, { member: address });
	console.log(data);
	return 0;
};
