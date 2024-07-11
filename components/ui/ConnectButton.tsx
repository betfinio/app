import {useAccount} from "wagmi";
import {FC, forwardRef} from "react";
import {Bet, BetLogo} from "@betfinio/ui/dist/icons";
import "@rainbow-me/rainbowkit/styles.css"
import {Button} from "./button.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "./popover.tsx";
import {useUsername} from "@/lib/query/username.ts";
import {truncateEthAddress, valueToNumber} from "@betfinio/hooks/dist/utils";
import {cx} from "class-variance-authority";
import {ArrowLeftRight, Loader, LogOut, Unplug, UserPen} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {useAllowance, useBalance, useIncreaseAllowance} from "@/lib/query/token.ts";
import BetChart from "@/components/ui/BetChart.tsx";
import {useWeb3Modal} from "@web3modal/wagmi/react";
import {useIsMember} from "@/lib/query/pass.ts";
import {Badge} from "@/components/ui/badge.tsx";

const ConnectButton = () => {
	const {address, chain} = useAccount();
	const {open} = useWeb3Modal()
	const handleConnect = async () => {
		await open();
	}
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
	const {data: isMember} = useIsMember(address)
	const {open} = useWeb3Modal();
	
	const isOpen = props['data-state'] === 'open'
	const handleOpenModal = async () => {
		await open()
	}
	const handleOpenProfile = () => {
		alert('open')
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
			<BetLogo className={'border-yellow-400 border-2 aspect-square w-8 h-8 rounded-full p-1 bg-primaryLighter'}/>
			<div className={'flex flex-col'}>
				<div className={'text-sm text-gray-400'}>{truncateEthAddress(address)}</div>
				{isMember ? <div className={'text-base text-white'}>{username}</div> : <Badge onClick={handleNotMember} variant={'destructive'}>Not a member</Badge>}
			</div>
			<motion.div className={'flex flex-row items-center justify-center gap-2'}
			            initial={{opacity: 0}}
			            transition={{duration: 0.1}}
			            animate={{opacity: isOpen ? 1 : 0, width: isOpen ? 'auto' : '0'}}>
				<UserPen className={'text-yellow-400'} onClick={handleOpenProfile}/>
				<LogOut className={'text-red-500'} onClick={handleOpenModal}/>
			</motion.div>
		</motion.div>
	</AnimatePresence>
});


export const WalletBalance: FC<{ className?: string }> = ({className = ''}) => {
	const {address} = useAccount();
	const {data: balance = 0n} = useBalance(address);
	const {data: allowance = 0n} = useAllowance(address);
	const {mutate: increaseAllowance, isPending} = useIncreaseAllowance();
	const handleAllowance = () => {
		increaseAllowance()
	}
	const handleAddToWallet = () => {
		// @ts-ignore
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
	if (address === undefined) return <div className={'w-full max-h-[150px] overflow-hidden'}><BetChart/></div>;
	return <div className={cx('flex flex-col w-full', className)}>
		<div className={'text-sm font-medium text-gray-400'}>Wallet balance:</div>
		<div className={'text-lg font-semibold flex flex-row items-center gap-1'}>{Math.floor(valueToNumber(balance)).toLocaleString()} <Bet className={'w-5 h-5'}/></div>
		<div className={'text-sm font-medium text-gray-400'}>Spendable limit:</div>
		<div className={'text-sm font-semibold flex flex-row items-center gap-1'}>{Math.floor(valueToNumber(allowance)).toLocaleString()} <Bet className={'w-3 h-3'}/></div>
		<div className={'grid grid-cols-2 gap-2 mt-2'}>
			<Button onClick={handleAllowance} variant={'outline'} className={'gap-1 px-3'}>
				{isPending ? <Loader className={'animate-spin'}/> : <><ArrowLeftRight className={'w-4 h-4'}/> Transfer</>}
			</Button>
			<Button variant={'outline'} className={'gap-1 border-yellow-400 hover:bg-yellow-400/10'}><Bet className={'w-4 h-4'}/> Buy</Button>
		</div>
		<div onClick={handleAddToWallet} className={'flex cursor-pointer flex-row gap-1 items-center text-sm mt-2 text-gray-400'}>Add <Bet/> to wallet</div>
	</div>
}