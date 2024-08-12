import type { Step } from '@/components/blocks/action/types.ts';
import type { FC } from 'react';

const ProgressBar: FC<{ step: Step }> = ({ step }) => {
	return <div>{step}</div>;
};

export default ProgressBar;
