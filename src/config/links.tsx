import {Affiliate, Bag, Bank, DepthAffiliate, DirectAffiliate, Predict, Roadmap, Roulette, Slots, Staking} from "@betfinio/ui/dist/icons";
import {LuckyRound} from "@betfinio/ui/dist/icons/LuckyRound";
import {Dice} from "@betfinio/ui/dist/icons/Dice";
import {Binary} from "@betfinio/ui/dist/icons/Binary";
import {Stones} from "@betfinio/ui/dist/icons/Stones";
import {Contact, PaperclipIcon} from "lucide-react";
import {NavItemProps} from "@/components/ui/NavItem";
import {getAffiliateUrl, getStakingUrl} from "@/lib";

const MODE = import.meta.env.PUBLIC_ENVIRONMENT
export const getAppUrl = () => {
	switch (MODE) {
		case 'development':
			return 'https://betfin-app-dev.web.app'
		case 'production':
			return 'https://app.betfin.io'
		default:
			return 'http://localhost:5555'
	}
}

const navigation: NavItemProps[] = [
	{
		label: 'staking', disabled: false, icon: <Staking/>, href: getStakingUrl() + '/', children: [
			{label: 'staking-conservative', href: getStakingUrl() + '/conservative', disabled: false, icon: <Bank className={'w-6 h-6'}/>},
			{label: 'staking-dynamic', href: getStakingUrl() + '/dynamic', disabled: false, icon: <Bag className={'w-6 h-6'}/>},
		]
	},
	{
		label: 'affiliate', icon: <Affiliate/>, href: getAffiliateUrl() + '/', disabled: false, children: [
			{label: 'affiliate-linear-tree', href: getAffiliateUrl() + '/linear', disabled: false, icon: <DirectAffiliate className={'w-6 h-[22px]'}/>},
			{label: 'affiliate-binary-tree', href: getAffiliateUrl() + '/binary', disabled: false, icon: <DepthAffiliate className={'w-6 h-[22px]'}/>},
		]
	},
]
const games: NavItemProps[] = [
	{label: 'predict', icon: <Predict/>, href: '/predict', disabled: false},
	{label: 'roulette', icon: <Roulette/>, href: '/roulette', disabled: false},
	{label: 'lottery', icon: <LuckyRound className={'w-6 h-6'}/>, href: '/lottery', soon: true, disabled: MODE === "prod"},
	{label: 'dice', icon: <Dice/>, href: '/dice'},
	{label: 'binary', icon: <Binary/>, href: '/poker'},
	{label: 'slots', icon: <Slots/>, href: '/slots'},
	{label: 'stones', icon: <Stones/>, href: '/stones'},
]

const others: NavItemProps[] = [
	{label: 'documentation', icon: <Roadmap/>, external: true, href: 'https://betfin.gitbook.io/betfin-public'},
	{label: 'about', icon: <PaperclipIcon className={'w-6 h-6'}/>, external: true, href: 'https://betfin.gitbook.io/betfin-public/v/about-betfin-1'},
	{label: 'support', icon: <Contact/>, href: '/support'},
]

export {navigation, games, others}