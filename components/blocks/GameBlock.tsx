import { Badge } from '@/components/ui/badge';
import { MoneyHand } from '@betfinio/ui/dist/icons';
import cx from 'clsx';
import type { FC } from 'react';

export interface GameBlockProps {
	className?: string;
	label: string;
	online: number;
	disabled?: boolean;
	loading?: boolean;
	soon?: boolean;
}

const GameBlock: FC<GameBlockProps> = ({ className = '', label, online, disabled = true, loading = false }) => {
	return (
		<div
			className={cx(
				className,
				disabled && 'grayscale',
				'mx-auto col-span-1 cursor-pointer relative w-[137.5px] h-[200px] md:w-[182px] md:h-[265px] bg-contain bg-no-repeat flex flex-col items-center  justify-center gap-2 pt-20 ',
			)}
		>
			<span className={'md:text-lg font-semibold'}>{label}</span>
			<div className={'flex flex-row items-center gap-2 text-sm md:text-normal'}>
				{disabled ? (
					<Badge className={'px-4 py-1 text-base lowercase'} variant={'outline'}>
						Soon
					</Badge>
				) : (
					<>
						<MoneyHand className={'w-5 aspect-square text-yellow-400'} />
						<div className={cx('font-medium', loading && 'blur-sm animate-pulse text-yellow-400')}>{online}</div>
						active bets
					</>
				)}
			</div>
		</div>
	);
};

export default GameBlock;
