import BigLogo from '@/components/icons/BigLogo.tsx';
import { BetLogo } from '@betfinio/ui/dist/icons';
import { cx } from 'class-variance-authority';
import type { FC } from 'react';

const Logo: FC<{ size: 'small' | 'big'; className?: string }> = ({ size, className }) => {
	if (size === 'small') {
		return <BetLogo className={cx(className)} />;
	}
	return <BigLogo className={cx(className)} />;
};

export default Logo;
