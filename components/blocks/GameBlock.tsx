import { Badge } from '@/components/ui/badge';
import { MoneyHand } from '@betfinio/ui/dist/icons';
import cx from 'clsx';
import { Clock } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface GameBlockProps {
	className?: string;
	label: string;
	online: number;
	historical?: number;
	disabled?: boolean;
	loading?: boolean;
	soon?: boolean;
}

const GameBlock: FC<GameBlockProps> = ({ className = '', label, online, historical, disabled = true, loading = false }) => {
	const { t } = useTranslation('shared', { keyPrefix: 'gameBlock' });
	return (
		<div
			className={cx(
				className,
				disabled && 'grayscale',
				'mx-auto col-span-1 cursor-pointer relative w-[137.5px] h-[200px] md:w-[182px] md:h-[265px] bg-contain bg-no-repeat flex flex-col items-center  justify-center gap-2 pt-20 ',
			)}
		>
			<span className={'text-sm md:text-lg font-semibold'}>{label}</span>
			<div className={'flex flex-row items-center gap-2 text-xs md:text-sm'}>
				{disabled ? (
					<Badge className={'px-4 py-1 text-base lowercase'} variant={'outline'}>
						{t('soon')}
					</Badge>
				) : (
					<div className={'flex flex-col gap-2'}>
						<div className={'flex flex-row items-center gap-2'}>
							<MoneyHand className={'w-4 h-4 md:w-5 md:h-5 aspect-square text-yellow-400'} />
							<div className={cx('font-medium', loading && 'blur-sm animate-pulse text-yellow-400')}>{online}</div>
							{t('activeBets')}
						</div>
						{historical !== undefined && (
							<div className={'flex flex-row items-center gap-2'}>
								<Clock className={'pl-0.5 w-4 h-4 md:w-5 md:h-5  aspect-square text-yellow-400'} />
								<div className={cx('font-medium', loading && 'blur-sm animate-pulse text-yellow-400')}>{historical ?? 0}</div>
								{t('historicalBets')}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default GameBlock;
