import {useAccount} from "wagmi";
import {FC, forwardRef, useEffect} from "react";
import {Bet, BetLogo} from "@betfinio/ui/dist/icons";
import {Button} from "./button.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "./popover.tsx";
import {useUsername} from "@/lib/query/username.ts";
import {cx} from "class-variance-authority";
import {ArrowLeftRight, Loader, LogOut, Unplug, UserPen} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {useAllowance, useBalance, useIncreaseAllowance} from "@/lib/query/token.ts";
import BetChart from "@/components/ui/BetChart.tsx";
import {useWeb3Modal} from "@web3modal/wagmi/react";
import {useIsMember} from "@/lib/query/pass.ts";
import {Badge} from "@/components/ui/badge.tsx";

import {truncateEthAddress, valueToNumber} from "@betfinio/abi/dist";
import {useTranslation} from "react-i18next";
import {useOpenProfile} from "@/lib/query/shared.ts";
import {useNavigate} from "@tanstack/react-router";
import {BetValue} from "@/components/ui/BetValue.tsx";

const ConnectButton = () => {
	const {address} = useAccount();
	const {open} = useWeb3Modal()
	const handleConnect = async () => {
		await open();
	}
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://app.livechatai.com/embed.js";
		script.async = true;
		script.defer = true;
		script.setAttribute('data-id', 'clypvp6o20003xh36bqa3cx2m')
		document.body.appendChild(script);
	}, []);
	useEffect(() => {
		if (!address) return;
		window.lc = window.lc || {};
		window.lc.identity = {
			distinctId: address.toLowerCase(), // required, unique identifier for your user,
			name: address.toLowerCase()
		};
	}, [address]);
	if (address === undefined) {
		return <Button onClick={handleConnect} variant={'outline'} className={'border-yellow-400 gap-2'}><Unplug className={'w-4 h-4'}/> Connect Wallet</Button>
	}
	return <Popover>
		<PopoverTrigger asChild>
			<AccountBlock/>
		</PopoverTrigger>
		<PopoverContent className={'-mt-1 w-[240px] rounded-t-none'}>
			<WalletBalance/>
		</PopoverContent>
	</Popover>
}

export default ConnectButton

const AccountBlock = forwardRef((props: any, forwardedRef: any) => {
	const {address} = useAccount()
	const {data: username} = useUsername(address)
	const {data: profile, open: openProfile} = useOpenProfile()
	const {data: isMember} = useIsMember(address)
	const {open} = useWeb3Modal();
	
	const isOpen = props['data-state'] === 'open'
	const handleOpenModal = async () => {
		await open()
	}
	const handleOpenProfile = () => {
		if (address) {
			openProfile(address)
		}
	}
	const handleNotMember = (e: any) => {
		e.stopPropagation()
		window.location.href = 'https://betfin.io'
	}
	if (!address) return <div {...props} ref={forwardedRef}></div>;
	return <AnimatePresence mode={'wait'}>
		<motion.div className={cx('h-[50px] whitespace-nowrap min-w-[100px] cursor-pointer rounded-lg rounded-b-none px-4 flex flex-row items-center justify-between gap-2', {
			'bg-gray-800 animate-in w-[240px]': isOpen,
		})} {...props} ref={forwardedRef}>
			{!isOpen && <UserPen className={'text-yellow-400 ml-3'} onClick={handleOpenProfile}/>}
			<BetLogo className={'border-yellow-400 border-2 aspect-square w-8 h-8 rounded-full p-1 bg-primaryLighter'}/>
			<div className={'flex flex-col'}>
				<div className={'text-sm text-gray-400'}>{truncateEthAddress(address)}</div>
				{isMember ? <div className={'text-base text-white w-[100px] overflow-x-hidden text-ellipsis'}>{username}</div> :
					<Badge onClick={handleNotMember} variant={'destructive'}>Not a member</Badge>}
			</div>
			<motion.div className={'flex flex-row items-center justify-center gap-2'}
			            initial={{opacity: 0}}
			            transition={{duration: 0.1}}
			            animate={{opacity: isOpen ? 1 : 0, width: isOpen ? 'auto' : '0'}}>
				<UserPen className={'text-yellow-400'} onClick={handleOpenProfile}/>
				<LogOut className={'text-red-roulette'} onClick={handleOpenModal}/>
			</motion.div>
		</motion.div>
	</AnimatePresence>
});


export const WalletBalance: FC<{ className?: string }> = ({className = ''}) => {
	const {address} = useAccount();
	const {t} = useTranslation('', {keyPrefix: 'shared'})
	const {data: balance = 0n} = useBalance(address);
	const {data: allowance = 0n} = useAllowance(address);
	const {mutate: increaseAllowance, isPending} = useIncreaseAllowance();
	const navigate = useNavigate();
	const handleAllowance = () => {
		increaseAllowance()
	}
	const handleAddToWallet = () => {
		window.ethereum.request({
			method: 'wallet_watchAsset',
			params: {
				type: 'ERC20',
				options: {
					address: import.meta.env.PUBLIC_TOKEN_ADDRESS, // The address that the token is at.
					symbol: 'BET', // A ticker symbol or shorthand, up to 5 characters.
					decimals: 18, // The number of decimals in the token.
				},
			},
		});
	}
	
	
	if (address === undefined) return <div className={'w-full h-[170px] overflow-hidden'}><BetChart/></div>;
	return <div className={cx('flex flex-col w-full h-[120px]', className)}>
		<div className={'flex flex-row items-center gap-1'}>
			<div className={'text-sm font-medium text-gray-400'}>{t("balance")}</div>
			<div className={'text-base font-semibold flex flex-row items-center gap-1'}>
				<BetValue value={Math.min(valueToNumber(balance), valueToNumber(allowance))} withIcon/></div>
		</div>
		<div className={'flex flex-row items-center gap-1'}>
			<div className={'text-sm text-gray-400'}>{t("allowance")}</div>
			<div className={'text-sm flex flex-row items-center gap-1'}><BetValue value={balance} withIcon/></div>
		</div>
		<div className={'grid grid-cols-2 gap-2 mt-2'}>
			<Button onClick={handleAllowance} variant={'outline'} className={'gap-1 px-3'}>
				{isPending ? <Loader className={'animate-spin'}/> : <><ArrowLeftRight className={'w-4 h-4'}/> Transfer</>}
			</Button>
			<a target={'_blank'} className={'w-full'} href="https://app.uniswap.org/swap?outputCurrency=0xbF7970D56a150cD0b60BD08388A4A75a27777777">
				<Button variant={'outline'} className={'w-full gap-1 border-yellow-400 hover:bg-yellow-400/10'}>
					<Bet className={'w-4 h-4'}/> Buy
				</Button>
			</a>
		
		</div>
		<div onClick={handleAddToWallet} className={'flex cursor-pointer flex-row gap-1 items-center text-sm mt-2 text-gray-400'}>Add <Bet/> to wallet</div>
	</div>
}