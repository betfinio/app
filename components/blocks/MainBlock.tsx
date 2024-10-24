import GameBlock from '@/components/blocks/GameBlock.tsx';
import { BetValue } from '@/components/ui/BetValue.tsx';
import { getGamesUrl, getStakingUrl } from '@/lib';
import { useTotalStaked as useConservativeTotalStaked } from '@/lib/query/conservative.ts';
import { useTotalProfit as useDynamicTotalProfit, useTotalStaked as useDynamicTotalStaked } from '@/lib/query/dynamic.ts';
import { useLuroHistorical, useLuroOnline } from '@/lib/query/luro.ts';
import { usePredictHistorical, usePredictOnline } from '@/lib/query/predict.ts';
import { useRouletteOnline } from '@/lib/query/roulette.ts';
import { useBalance } from '@/lib/query/token.ts';
import { valueToNumber } from '@betfinio/abi/dist';
import Bag from '@betfinio/ui/dist/icons/Bag';
import Bank from '@betfinio/ui/dist/icons/Bank';
import { Link } from '@tanstack/react-router';
import cx from 'clsx';
import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface MainBlockProps {
	variant: 'conservative' | 'dynamic';
}

const MainBlock: FC<MainBlockProps> = ({ variant }) => {
	const { t } = useTranslation('shared', { keyPrefix: `homepage.staking.${variant}` });
	const { data: stakedConservative = 0n, ...conservative } = useConservativeTotalStaked();
	const { data: stakedDynamic = 0n, ...dynamic } = useDynamicTotalStaked();
	const { data: predictOnline = 0, isFetching: isPredictOnlineFetching } = usePredictOnline();
	const { data: predictHistorical = 0, isFetching: isPredictHistoricalFetching } = usePredictHistorical();
	const { data: luroOnline = 0, isFetching: isLuroOnlineFetching } = useLuroOnline();
	const { data: luroHistorical = 0, isFetching: isLuroHistoricalFetching } = useLuroHistorical();
	const { data: rouletteOnline = 0, isFetching: isRouletteOnlineFetching } = useRouletteOnline();
	const { data: conservativeBalance = 0n } = useBalance(import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS);
	const { data: dynamicRevenue = 0n } = useDynamicTotalProfit();
	const getGameBlocks = () => {
		switch (variant) {
			case 'conservative':
				return (
					<>
						<Link to={`${getGamesUrl('predict')}`}>
							<GameBlock
								disabled={false}
								className={'bg-game-predict'}
								label={t('predict')}
								loading={isPredictOnlineFetching || isPredictHistoricalFetching}
								online={predictOnline}
								historical={predictHistorical}
							/>
						</Link>
						<Link to={`${getGamesUrl('luro')}`} className={'hidden md:flex'}>
							<GameBlock
								className={'bg-game-luro'}
								disabled={false}
								label={t('luro')}
								historical={luroHistorical}
								online={luroOnline}
								loading={isLuroOnlineFetching || isLuroHistoricalFetching}
							/>
						</Link>
						<div className={'hidden sm:flex'}>
							<GameBlock className={'bg-game-stones'} label={t('stones')} online={0} />
						</div>
						<StakingInfo
							icon={<Bank className={'w-[36px] h-[36px] shrink-0 text-yellow-400'} />}
							pa={valueToNumber(conservativeBalance)}
							buttonLabel={t('info.buttonLabel')}
							variant={'conservative'}
							loading={conservative.isFetching}
							paLabel={t('info.paLabel')}
							subtitle={t('info.subtitle')}
							title={t('info.title')}
							total={valueToNumber(stakedConservative)}
							totalLabel={t('info.totalLabel')}
						/>
					</>
				);
			case 'dynamic':
				return (
					<>
						<Link to={`${getGamesUrl('roulette')}`}>
							<GameBlock disabled={false} className={'bg-game-roulette'} label={t('roulette')} online={rouletteOnline} loading={isRouletteOnlineFetching} />
						</Link>
						<div className={'hidden sm:flex'}>
							<GameBlock className={'bg-game-blackjack'} label={t('blackjack')} online={0} />
						</div>
						<div className={'hidden md:flex'}>
							<GameBlock className={'bg-game-slots'} label={t('slots')} online={0} />
						</div>
						<StakingInfo
							icon={<Bag className={'w-[36px] h-[36px] text-yellow-400 shrink-0'} />}
							pa={valueToNumber(dynamicRevenue)}
							buttonLabel={t('info.buttonLabel')}
							variant={'dynamic'}
							loading={dynamic.isFetching}
							paLabel={t('info.paLabel')}
							subtitle={t('info.subtitle')}
							title={t('info.title')}
							total={valueToNumber(stakedDynamic)}
							totalLabel={t('info.totalLabel')}
						/>
					</>
				);
		}
	};
	return (
		<div className={'min-h-[284px] border border-gray-800 rounded-lg bg-primaryLight grid grid-cols-2 items-center sm:grid-cols-3 md:grid-cols-4 px-4 py-6'}>
			{getGameBlocks()}
		</div>
	);
};

interface StakeInfoProps {
	icon: ReactNode;
	title: string;
	subtitle: string;
	total: number;
	pa: number;
	totalLabel: string;
	paLabel: string;
	variant: string;
	buttonLabel: string;
	loading: boolean;
}

const StakingInfo: FC<StakeInfoProps> = ({ icon, title, subtitle, loading = false, total, totalLabel, pa, paLabel, buttonLabel, variant }) => {
	const loadStyle = 'text-secondaryLight animate-pulse bg-secondaryLight rounded-xl !p-0 mt-2';
	return (
		<div className={'w-full flex  flex-col justify-between items-center text-center gap-1 md:gap-0'}>
			{icon}
			<h3 className={'text-base md:text-xl font-semibold text-yellow-400'}>{title}</h3>
			<h4 className={'text-xs md:text-sm text-gray-500'}>{subtitle}</h4>
			<span className={cx('text-base md:text-xl font-semibold pt-2 leading-[0] flex gap-1', loading && loadStyle)}>
				<BetValue value={total} withIcon={true} />
			</span>
			<span className={cx('text-xs md:text-sm text-gray-500 text-semibold')}>{totalLabel}</span>
			<span className={cx('text-base md:text-xl font-semibold text-yellow-400 pt-2 leading-[0]', loading && loadStyle)}>
				<BetValue value={pa} withIcon prefix={'Revenue from last cycle: '} />
			</span>
			<span className={'text-xs md:text-sm text-gray-500 text-semibold'}>{paLabel}</span>
			<Link className={'text-black bg-yellow-400 text-xs md:text-sm font-medium px-4 py-2 rounded-lg mt-2'} to={getStakingUrl(variant)}>
				{buttonLabel}
			</Link>
		</div>
	);
};

export default MainBlock;
