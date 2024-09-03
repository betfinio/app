import type { NavItemProps } from '@/components/ui/NavItem';
import { getAcademyUrl, getAffiliateUrl, getGamesUrl, getStakingUrl } from '@/lib';
import { Affiliate, Bag, Bank, DepthAffiliate, DirectAffiliate, Predict, Roadmap, Roulette, Slots, Staking } from '@betfinio/ui/dist/icons';
import { Binary } from '@betfinio/ui/dist/icons/Binary';
import { Dice } from '@betfinio/ui/dist/icons/Dice';
import { LuckyRound } from '@betfinio/ui/dist/icons/LuckyRound';
import { Stones } from '@betfinio/ui/dist/icons/Stones';
import { BookA, PaperclipIcon } from 'lucide-react';

const navigation: NavItemProps[] = [
	{
		label: 'staking',
		disabled: false,
		icon: <Staking />,
		href: getStakingUrl(),
		children: [
			{ label: 'staking-conservative', href: getStakingUrl('/conservative'), disabled: false, icon: <Bank className={'w-6 h-6'} /> },
			{ label: 'staking-dynamic', href: getStakingUrl('/dynamic'), disabled: false, icon: <Bag className={'w-6 h-6'} /> },
		],
	},
	{
		label: 'affiliate',
		icon: <Affiliate />,
		href: getAffiliateUrl(),
		disabled: false,
		children: [
			{ label: 'affiliate-linear-tree', href: getAffiliateUrl('/linear'), disabled: false, icon: <DirectAffiliate className={'w-6 h-6'} /> },
			{ label: 'affiliate-binary-tree', href: getAffiliateUrl('/binary'), disabled: false, icon: <DepthAffiliate className={'w-6 h-6'} /> },
		],
	},
];
const games: NavItemProps[] = [
	{ label: 'predict', icon: <Predict />, href: getGamesUrl('/predict'), disabled: false },
	{ label: 'roulette', icon: <Roulette />, href: getGamesUrl('/roulette'), disabled: false },
	{ label: 'luro', icon: <LuckyRound className={'w-6 h-6'} />, href: getGamesUrl('/luro'), disabled: false },
	{ label: 'dice', icon: <Dice />, href: getGamesUrl('/dice') },
	{ label: 'binary', icon: <Binary />, href: getGamesUrl('/poker') },
	{ label: 'slots', icon: <Slots />, href: getGamesUrl('/slots') },
	{ label: 'stones', icon: <Stones />, href: getGamesUrl('/stones') },
];

const others: NavItemProps[] = [
	{ label: 'documentation', icon: <Roadmap />, external: true, href: 'https://betfin.gitbook.io/betfin-public' },
	{ label: 'about', icon: <PaperclipIcon className={'w-6 h-6'} />, external: true, href: 'https://betfin.gitbook.io/betfin-public/v/about-betfin-1' },
	{ label: 'academy', icon: <BookA className={'w-6 h-6'} />, href: getAcademyUrl('/lesson/1/1') },
];

export { navigation, games, others };
