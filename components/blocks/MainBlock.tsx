import {FC, ReactNode} from "react";
import Bank from "@betfinio/ui/dist/icons/Bank";
import Bag from "@betfinio/ui/dist/icons/Bag";
import {valueToNumber} from "@betfinio/hooks/dist/utils";
import {Link} from "@tanstack/react-router";
import cx from "clsx";
import {MillifyWithTooltip} from "@betfinio/ui/dist/shared/atoms/MillifyWithTooltip";
import {useBalance} from "@/lib/query/token.ts";
import GameBlock from "@/components/blocks/GameBlock.tsx";
import {useTranslation} from "react-i18next";
import {usePredictOnline} from "@/lib/query/predict.ts";
import {useTotalStaked as useConservativeTotalStaked} from "betfinio_staking/lib/query/conservative";
import {useTotalProfit as useDynamicTotalProfit, useTotalStaked as useDynamicTotalStaked} from "betfinio_staking/lib/query/dynamic";
import {getGamesUrl} from "@/lib";

export interface MainBlockProps {
	variant: 'conservative' | 'dynamic'
}

const MainBlock: FC<MainBlockProps> = ({variant}) => {
	const {t} = useTranslation('', {keyPrefix: `shared.homepage.staking.${variant}`})
	const {data: stakedConservative = 0n, ...conservative} = useConservativeTotalStaked()
	const {data: stakedDynamic = 0n, ...dynamic} = useDynamicTotalStaked()
	const {data: predictOnline = 0, isFetching: isPredictOnlineFetching} = usePredictOnline()
	const {data: conservativeBalance = 0n} = useBalance(import.meta.env.PUBLIC_CONSERVATIVE_STAKING_CONTRACT_ADDRESS)
	const {data: dynamicRevenue = 0n} = useDynamicTotalProfit()
	const getGameBlocks = () => {
		switch (variant) {
			case 'conservative':
				return <>
					<Link to={getGamesUrl() + '/predict'}>
						<GameBlock disabled={false} className={'bg-game-predict'} label={t('predict')} loading={isPredictOnlineFetching} online={predictOnline}/>
					</Link>
					<Link to={getGamesUrl() + "/soon"} className={' hidden md:flex'}>
						<GameBlock className={'bg-game-poker'} label={t('poker')} online={0}/>
					</Link>
					<Link to={getGamesUrl() + "/soon"} className={'hidden sm:flex'}>
						<GameBlock className={'bg-game-gem-roulette'} label={t('gem-roulette')} online={0}/>
					</Link>
					<StakingInfo icon={<Bank className={'w-[36px] h-[36px] shrink-0 text-[#FFC800]'}/>} pa={valueToNumber(conservativeBalance)} buttonLabel={t('info.buttonLabel')}
					             variant={'conservative'}
					             loading={conservative.isFetching}
					             paLabel={t('info.paLabel')}
					             subtitle={t('info.subtitle')} title={t('info.title')}
					             total={valueToNumber(stakedConservative)}
					             totalLabel={t("info.totalLabel")}/>
				</>;
			case 'dynamic':
				return <>
					<Link to={getGamesUrl() + '/soon'} className={'hidden sm:flex'}>
						<GameBlock className={'bg-game-blackjack'} label={t('blackjack')} online={0}/>
					</Link>
					<Link to={getGamesUrl() + "/roulette"}>
						<GameBlock disabled={false} className={'bg-game-roulette'} label={t('roulette')} online={0}/>
					</Link>
					<Link to={getGamesUrl() + "/soon"} className={'hidden md:flex'}>
						<GameBlock className={'bg-game-slots'} label={t('slots')} online={0}/>
					</Link>
					<StakingInfo icon={<Bag className={'w-[36px] h-[36px] text-[#FFC800] shrink-0'}/>} pa={valueToNumber(dynamicRevenue)} buttonLabel={t('info.buttonLabel')}
					             variant={'dynamic'}
					             loading={dynamic.isFetching}
					             paLabel={t('info.paLabel')}
					             subtitle={t('info.subtitle')} title={t('info.title')}
					             total={valueToNumber(stakedDynamic)}
					             totalLabel={t("info.totalLabel")}/>
				</>;
		}
		
	}
	return <div
		className={'min-h-[284px] border border-gray-800 rounded-lg bg-primaryLight grid grid-cols-2 items-center sm:grid-cols-3 md:grid-cols-4 px-4 py-6'}>
		{getGameBlocks()}
	</div>;
}

interface StakeInfoProps {
	icon: ReactNode,
	title: string,
	subtitle: string,
	total: number
	pa: number
	totalLabel: string
	paLabel: string,
	variant: string
	buttonLabel: string,
	loading: boolean
}

const StakingInfo: FC<StakeInfoProps> = ({
	icon,
	title,
	subtitle,
	loading = false,
	total,
	totalLabel,
	pa,
	paLabel,
	buttonLabel,
	variant
}) => {
	const loadStyle = 'text-secondaryLight animate-pulse bg-secondaryLight rounded-xl !p-0 mt-2'
	const href = `/staking/${variant}`
	return <div className={'w-full flex  flex-col justify-between items-center text-center gap-1 md:gap-0'}>
		{icon}
		<h3 className={'text-base md:text-xl font-semibold text-[#FFC800]'}>{title}</h3>
		<h4 className={'text-xs md:text-sm text-gray-500'}>{subtitle}</h4>
		<span className={cx('text-base md:text-xl font-semibold pt-2 leading-[0] flex gap-1', loading && loadStyle)}>
			<MillifyWithTooltip value={total} withIcon={true}/>
		</span>
		<span className={cx('text-xs md:text-sm text-gray-500 text-semibold',)}>{totalLabel}</span>
		<span className={cx('text-base md:text-xl font-semibold text-yellow-400 pt-2 leading-[0]', loading && loadStyle)}>
			<MillifyWithTooltip value={pa} withIcon prefix={"Revenue from last cycle: "}/>
		</span>
		<span className={'text-xs md:text-sm text-gray-500 text-semibold'}>{paLabel}</span>
		<Link className={'text-black bg-yellow-400 text-xs md:text-sm font-medium px-4 py-2 rounded-lg mt-2'} to={href}>{buttonLabel}</Link>
	</div>
}

export default MainBlock;