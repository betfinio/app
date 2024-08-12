import ProgressBar from '@/components/blocks/action/ProgressBar.tsx';
import type { ActionModalProps, Step } from '@/components/blocks/action/types.ts';
import { Dialog, DialogContent } from '@/components/ui/dialog.tsx';
import { type FC, useEffect, useState } from 'react';
import AllowanceStep from './AllowanceStep';

const ActionModal: FC<ActionModalProps> = ({ open, onClose, onAction, scan, tx, requiredAllowance, allowance }) => {
	const [state, setState] = useState<Step>('allowance');

	useEffect(() => {
		if (requiredAllowance > allowance) {
			setState('transaction');
		}
	}, [allowance, requiredAllowance]);

	// todo finish later
	return (
		<Dialog open={open} onOpenChange={() => onClose()}>
			<DialogContent>
				<ProgressBar step={state} />
				{state === 'allowance' && <AllowanceStep onAction={onAction} />}
			</DialogContent>
		</Dialog>
	);
};

export default ActionModal;
