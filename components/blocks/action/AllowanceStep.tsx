import type { ActionModalProps, Step } from '@/components/blocks/action/types.ts';
import type { FC } from 'react';

const AllowanceStep: FC<Pick<ActionModalProps, 'onAction'>> = ({ onAction }) => {
	const handleClick = () => {
		console.log('handle click');
		onAction({ type: 'request_allowance' });
	};
	return <div onClick={handleClick}>allowance</div>;
};

export default AllowanceStep;
