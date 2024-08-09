import logoSvg from '@/src/assets/logo.svg';
import { truncateEthAddress } from '@betfinio/hooks/dist/utils';
import {
	Bet,
	BetLogo,
	CertikWithIcon,
	ChainlinkWithIcon,
	Coinmarketcap,
	Dyno,
	Facebook,
	Github,
	Instagram,
	Linkedin,
	Menu,
	PolygonWithIcon,
	Twitter,
	Uniswap,
} from '@betfinio/ui/dist/icons';
import Globe from '@betfinio/ui/dist/icons/Globe';
import Support from '@betfinio/ui/dist/icons/Support';
import { Send } from 'lucide-react';

const ETHSCAN = import.meta.env.PUBLIC_ETHSCAN;
const PARTNER = import.meta.env.PUBLIC_PARTNER_ADDRESS;

const Footer = () => {
	const handleAdd = () => {
		window.ethereum.request({
			method: 'wallet_watchAsset',
			params: {
				type: 'ERC20',
				options: {
					address: import.meta.env.PUBLIC_TOKEN_ADDRESS, // The address of the token.
					symbol: 'BET', // A ticker symbol or shorthand, up to 5 characters.
					decimals: 18, // The number of decimals in the token.
				},
			},
		});
	};
	return (
		<div className={'mb-10'}>
			<div className={'hidden px-10'}>
				<div className={'flex justify-between  items-center'}>
					<BetLogo />
					<Menu className={'text-white'} />
				</div>
				<p className={'mt-4 text-[#9BA9B4]'}>
					Betfin is decentralized web3 application that allows anyone to bet or stake through trustless contracts. This website is only an interface of the web3
					application and runs as a non profit public service.
				</p>

				<div className={'mt-6 flex gap-4 items-center'}>
					<div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#25282C] text-white">
						<Twitter />
					</div>
					<div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#25282C] text-white">
						<Github />
					</div>
					<div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#25282C] text-white">
						<Facebook />
					</div>
					<div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#25282C] text-white">
						<Instagram />
					</div>
					<div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#25282C] text-white">
						<Linkedin />
					</div>
				</div>

				<p className={'mt-6 text-sm text-[#9BA9B4]'}>All right reserved 2024</p>
			</div>

			<div className={'block  text-[#9BA9B4] FOOTER text-sm border-t border-primaryLighter pt-10'}>
				<div className={'px-10 max-w-[1440px] mx-auto w-full'}>
					<div className={'grid grid-cols-5'}>
						<div className={'col-span-5 md:col-span-1 xl:col-span-2 flex flex-col items-center md:items-baseline'}>
							<img height={100} width={100} src={logoSvg} alt="Betfin" />
							<p
								className={`
								mt-5 w-[85%] text-sm text-center
								md:text-left
							`}
							>
								This site is part of BetFin decentralized ecosystem
							</p>

							<div
								className={`
								mt-3 font-semibold text-center
								md:text-left`}
							>
								<p className={'text-[#6A6F84]'}>Verify partner contract</p>
								<a href={`${ETHSCAN}/address/${PARTNER}`} target={'_blank'} className={'text-white hover:text-[#FFC800] duration-300'} rel="noreferrer">
									{truncateEthAddress(PARTNER)}
								</a>
							</div>
						</div>
						<FooterMenu />
					</div>

					<div className={'py-6 border-b border-[#151A2A] mt-[30px] flex flex-col justify-between items-center font-semibold text-[#CFD4DD] gap-5 sm:flex-row'}>
						<div className={'flex flex-col items-center gap-5 sm:flex-row'}>
							<p>Socials:</p>
							<div className={'flex gap-[10px] items-center'}>
								<a
									href={'https://twitter.com/betf1n1865/status/1787832131835613411'}
									target={'_blank'}
									className="w-8 h-8 flex items-center justify-center rounded-full bg-[#25282C] text-white cursor-pointer hover:text-black hover:bg-[#FFC800] duration-300"
									rel="noreferrer"
								>
									<Twitter />
								</a>
								{/*<div*/}
								{/*	className="w-8 h-8 flex items-center justify-center rounded-full bg-[#25282C] text-white cursor-pointer hover:text-black hover:bg-[#FFC800] duration-300">*/}
								{/*	<Github/>*/}
								{/*</div>*/}
								{/*<div*/}
								{/*	className="w-8 h-8 flex items-center justify-center rounded-full bg-[#25282C] text-white cursor-pointer hover:text-black hover:bg-[#FFC800] duration-300">*/}
								{/*	<Facebook/>*/}
								{/*</div>*/}
								{/*<div*/}
								{/*	className="w-8 h-8 flex items-center justify-center rounded-full bg-[#25282C] text-white cursor-pointer hover:text-black hover:bg-[#FFC800] duration-300">*/}
								{/*	<Instagram/>*/}
								{/*</div>*/}
								<a
									href={'https://t.me/betfin_official'}
									target={'_blank'}
									className="w-8 h-8 flex items-center justify-center rounded-full bg-[#25282C] text-white cursor-pointer hover:text-black hover:bg-[#FFC800] duration-300"
									rel="noreferrer"
								>
									<Send className={'w-4 h-4'} />
								</a>
							</div>
						</div>
						<div className={'flex flex-col items-center gap-5 sm:flex-row'}>
							<p>Exchanges:</p>
							<div className={'flex gap-5 items-center'}>
								<a
									target={'_blank'}
									className={'-translate-y-[3px] hover:text-[#fc72ff] duration-300'}
									href="https://app.uniswap.org/swap?outputCurrency=0xbF7970D56a150cD0b60BD08388A4A75a27777777"
									rel="noreferrer"
								>
									<Uniswap className={'text-inherit'} />
								</a>
								<a target={'_blank'} className={'hover:text-yellow-400 duration-300'} href="https://coinmarketcap.com/currencies/betfin/" rel="noreferrer">
									<Coinmarketcap className={'text-inherit'} />
								</a>
								<a target={'_blank'} className={'hover:text-[#4bcc00] duration-300'} href="https://www.coingecko.com/en/coins/betfin-token" rel="noreferrer">
									<Dyno className={'text-inherit'} />
								</a>
							</div>
						</div>
					</div>

					<div className={'mt-[30px] flex items-center justify-between flex-wrap gap-7'}>
						<div
							className={'text-sm text-gray-400 hover:text-white duration-300 cursor-pointer flex justify-center grow items-center gap-1'}
							onClick={handleAdd}
						>
							Add <Bet className={'w-3 h-3'} /> token to Wallet
						</div>
						<div className={'grow flex justify-center'}>
							<div className={'flex flex-col gap-4 overflow-x-auto SCROLLBAR sm:flex-row'}>
								<a
									href={'https://skynet.certik.com/projects/betfin'}
									target={'_blank'}
									className={'py-2 px-3 border hover:border-yellow-400 duration-300 rounded-lg shrink-0 border-[#212121] flex gap-[10px] items-center'}
									rel="noreferrer"
								>
									<span className={'text-sm text-[#CFD4DD]'}>Audited by:</span>
									<CertikWithIcon />
								</a>
								<a
									href={'https://polygonscan.com/token/0xbF7970D56a150cD0b60BD08388A4A75a27777777'}
									target={'_blank'}
									className={'py-2 px-3 border hover:border-yellow-400 duration-300 rounded-lg shrink-0 border-[#212121] flex gap-[10px] items-center'}
									rel="noreferrer"
								>
									<span className={'text-sm text-[#CFD4DD]'}>Powered by:</span>
									<PolygonWithIcon />
								</a>
								<a
									href={'https://docs.chain.link/vrf'}
									target={'_blank'}
									className={'py-2 px-3 border hover:border-yellow-400 duration-300 rounded-lg shrink-0 border-[#212121] flex gap-[10px] items-center'}
									rel="noreferrer"
								>
									<span className={'text-sm text-[#CFD4DD]'}>Protected by:</span>
									<ChainlinkWithIcon />
								</a>
							</div>
						</div>
						<div className={'flex items-center justify-center gap-7 grow'}>
							<div className={'text-[#CFD4DD] hover:text-[#FFC800] group cursor-pointer duration-300 flex items-center gap-2'}>
								<p>Support</p>
								<Support />
							</div>

							<div className={'text-[#CFD4DD] hover:text-[#FFC800] group cursor-pointer duration-300 flex items-center gap-2'}>
								<Globe />
								<p>EN</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Footer;

import { getAffiliateUrl, getGamesUrl, getStakingUrl } from '@/lib';
import { Link } from '@tanstack/react-router';

export const FooterMenu = () => {
	return (
		<div className={'hidden mt-10 md:mt-0 lg:grid grid-cols-3 gap-10 sm:gap-0 col-span-5 md:col-span-4 xl:col-span-3'}>
			<div
				className={
					'flex flex-col items-center sm:items-baseline gap-1 md:pr-5 text-sm font-medium col-span-3 sm:col-span-1 justify-self-center md:justify-self-end'
				}
			>
				<p className={'text-[#D9E3EA] font-semibold'}>Betfin Games</p>
				<Link to={getGamesUrl('predict')} className={'cursor-pointer hover:text-[#FFC800] duration-300'}>
					Predict
				</Link>
				<Link to={getGamesUrl('roulette')} className={'cursor-pointer hover:text-[#FFC800] duration-300'}>
					Roulette
				</Link>
			</div>
			<div
				className={'flex flex-col items-center sm:items-baseline gap-1 text-sm font-medium col-span-3 sm:col-span-1 justify-self-center md:justify-self-end'}
			>
				<p className={'text-[#D9E3EA] font-semibold'}>Finance Reward System</p>
				<Link to={getStakingUrl('conservative')} className={'cursor-pointer hover:text-[#FFC800] duration-300'}>
					Conservative staking
				</Link>
				<Link to={getStakingUrl('dynamic')} className={'cursor-pointer hover:text-[#FFC800] duration-300'}>
					Dynamic staking
				</Link>
				<Link to={getAffiliateUrl('')} className={'cursor-pointer hover:text-[#FFC800] duration-300'}>
					Affiliate & binary matching
				</Link>
				<a
					href={'https://betfin.gitbook.io/betfin-public/v/for-partners'}
					target={'_blank'}
					className={'cursor-pointer hover:text-[#FFC800] duration-300'}
					rel="noreferrer"
				>
					Become a partner
				</a>
			</div>
			<div
				className={'flex flex-col items-center sm:items-baseline gap-1 text-sm font-medium col-span-3 sm:col-span-1 justify-self-center md:justify-self-end'}
			>
				<p className={'text-[#D9E3EA] font-semibold'}>About Betfin</p>
				<p className={'hidden cursor-pointer hover:text-[#FFC800] duration-300'}>All terms & conditions</p>
				<a
					href={'https://betfin.gitbook.io/betfin-public/v/about-betfin-1/betfin-governance/betfin-contract-addresses'}
					target={'_blank'}
					className={'cursor-pointer hover:text-[#FFC800] duration-300'}
					rel="noreferrer"
				>
					Official contracts
				</a>
				<a
					href={'https://betfin.gitbook.io/betfin-public/v/about-betfin-1/audits-and-bug-bounty/certik-audit'}
					target={'_blank'}
					className={'cursor-pointer hover:text-[#FFC800] duration-300'}
					rel="noreferrer"
				>
					Audits
				</a>
				<p className={' hidden cursor-pointer hover:text-[#FFC800] duration-300'}>Legal disclaimers</p>
			</div>
		</div>
	);
};
