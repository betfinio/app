import type { Address } from 'viem';

interface RequestAllowanceAction {
	type: 'request_allowance';
}
interface SignTransactionAction {
	type: 'sign_transaction';
}
export type Step = 'allowance' | 'transaction' | 'result';
export type Action = RequestAllowanceAction | SignTransactionAction;
export interface ActionModalProps {
	open: boolean;
	onClose: () => void;
	onAction: (action: Action) => void;
	requiredAllowance: bigint;
	allowance: bigint;
	tx?: Address;
	scan: string;
}
