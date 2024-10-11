import type { NavItemProps } from '@/components/ui/NavItem';
import { getAcademyUrl, getAffiliateUrl, getGamesUrl, getStakingUrl } from '@/lib';
import { isItemVisible } from '@/lib/utils.ts';
import { Affiliate, Bag, Bank, DepthAffiliate, DirectAffiliate, Predict, Roadmap, Roulette, Slots, Staking } from '@betfinio/ui/dist/icons';
import { Binary } from '@betfinio/ui/dist/icons/Binary';
import { LuckyRound } from '@betfinio/ui/dist/icons/LuckyRound';
import { Stones } from '@betfinio/ui/dist/icons/Stones';
import { ArrowUpDown, BookA, ChartSpline } from 'lucide-react';

const navigation: NavItemProps[] = [
	{
		label: 'staking',
		keyIndex: 1,
		disabled: false,
		icon: <Staking />,
		href: getStakingUrl(),
		children: [
			{ label: 'staking-conservative', keyIndex: 2, href: getStakingUrl('/conservative'), disabled: false, icon: <Bank className={'w-6 h-6'} /> },
			{ label: 'staking-dynamic', keyIndex: 4, href: getStakingUrl('/dynamic'), disabled: false, icon: <Bag className={'w-6 h-6'} /> },
		].filter((item) => isItemVisible(item.keyIndex)),
	},
	{
		label: 'affiliate',
		icon: <Affiliate />,
		href: getAffiliateUrl(),
		disabled: false,
		keyIndex: 8,
		children: [
			{ label: 'affiliate-linear-tree', keyIndex: 16, href: getAffiliateUrl('/linear'), disabled: false, icon: <DirectAffiliate className={'w-6 h-6'} /> },
			{ label: 'affiliate-binary-tree', keyIndex: 32, href: getAffiliateUrl('/binary'), disabled: false, icon: <DepthAffiliate className={'w-6 h-6'} /> },
		].filter((item) => isItemVisible(item.keyIndex)),
	},
].filter((item) => isItemVisible(item.keyIndex));
const games: NavItemProps[] = [
	{ label: 'predict', keyIndex: 64, icon: <Predict />, href: getGamesUrl('/predict'), disabled: false },
	{ label: 'roulette', icon: <Roulette />, href: getGamesUrl('/roulette'), disabled: false, keyIndex: 128 },
	{ label: 'luro', icon: <LuckyRound className={'w-6 h-6'} />, href: getGamesUrl('/luro'), disabled: false, keyIndex: 256 },
	{ label: 'hilo', icon: <ArrowUpDown />, href: getGamesUrl('/hilo'), keyIndex: 512 },
	{ label: 'binary', icon: <Binary />, href: getGamesUrl('/poker'), keyIndex: 1024 },
	{ label: 'slots', icon: <Slots />, href: getGamesUrl('/slots'), keyIndex: 2048 },
	{ label: 'stones', icon: <Stones />, href: getGamesUrl('/stones'), keyIndex: 4096 },
].filter((item) => isItemVisible(item.keyIndex));

const others: NavItemProps[] = [
	{
		label: 'documentation',
		icon: <Roadmap className={'w-6 h-6'} />,
		external: true,
		href: 'https://betfin.gitbook.io/betfin-public/v/about-betfin-1',
		keyIndex: 8192,
	},
	{ label: 'stats', icon: <ChartSpline className={'w-6 h-6'} />, disabled: false, href: getStakingUrl('/statistics'), keyIndex: 16384 },
	{ label: 'academy', icon: <BookA className={'w-6 h-6'} />, disabled: false, href: getAcademyUrl('/advanced'), keyIndex: 32768 },
].filter((item) => isItemVisible(item.keyIndex));

export { navigation, games, others };
