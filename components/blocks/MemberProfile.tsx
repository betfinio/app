import {useOpenProfile, useRegistrationDate, useSide} from "@/lib/query/shared.ts";
import {Dialog, DialogClose, DialogContent, DialogTitle} from "@/components/ui/dialog.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../ui/tooltip";
import {motion} from "framer-motion";
import {AlertCircle, ArrowLeftCircleIcon, ArrowRightCircleIcon, Copy, Layers3, LinkIcon, Loader, Medal, PencilIcon, X} from "lucide-react";
import {truncateEthAddress, valueToNumber} from "@betfinio/abi/dist";
import {Input} from "@/components/ui/input.tsx";
import cx from "clsx";
import {FC, useMemo, useState} from "react";
import {useAccount} from "wagmi";
import {Button} from "@/components/ui/button.tsx";
import {DateTime} from "luxon";
import {ZeroAddress} from "@betfinio/abi";
import {Blackjack, Hero, People} from "@betfinio/ui/dist/icons";
import {BetValue} from "@/components/ui/BetValue.tsx";
import {useInviteStakingVolume, useTreeMember} from "@/lib/query/affiliate.ts";
import {defaultTreeMember} from "@/lib/types";
import {useUsername} from "@/lib/query/username.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

const MemberProfile = () => {
	const {data, close} = useOpenProfile()
	const {address: me} = useAccount()
	const {data: regDate = 0, ...regDateOther} = useRegistrationDate(data.address || ZeroAddress)
	const {data: member = defaultTreeMember} = useTreeMember(data.address || ZeroAddress);
	const {data: bettingVolume = 0n} = useInviteStakingVolume(data.address || ZeroAddress)
	const {data: stakingVolume = 0n} = useInviteStakingVolume(data.address || ZeroAddress)
	const {data: username} = useUsername(data.address || ZeroAddress);
	const volume = [stakingVolume, bettingVolume]
	const handleClose = () => {
		close()
	}
	
	const totalVolume = useMemo(() => {
		return member ? valueToNumber(member.volumeLeft + member.volumeRight + member.betsRight / 100n + member.betsLeft / 100n) : 0
	}, [member])
	console.log(data, me)
	if (!data.open || !data.address || !me) return null;
	const address = data.address
	
	
	const handleCopyAddress = async () => {
		await navigator.clipboard.writeText(address)
	}
	
	const handleSaveUsername = async (username: string) => {
		return false
	}
	const handleCopyLink = () => {
		alert('copy')
	}
	return <Dialog open={true} onOpenChange={handleClose}>
		<DialogContent aria-describedby={undefined} className={'lg:min-w-[1000px]'}>
			<DialogTitle/>
			<TooltipProvider delayDuration={0}>
				<ScrollArea className={'max-h-[100vh]'}>
					<motion.div className={'mx-auto text-white w-full rounded-3xl  bg-primaryLight'}>
						<div className={'p-4 lg:p-8 mb-10 relative'}>
							<DialogClose>
								<X
									className={'absolute top-4 right-4 w-6 h-6 p-1 border-2 border-white rounded-full cursor-pointer hover:text-[#DD375F] hover:border-[#DD375F] duration-300'}/>
							</DialogClose>
							
							<div className={'flex items-center justify-center text-lg font-semibold'}>Member profile</div>
							<div className={'grid lg:grid-cols-6 grid-cols-1 gap-0 lg:gap-4 my-4'}>
								<motion.div className={'col-span-1 py-4'}>
									<motion.img whileHover={{scale: 1.03}} whileTap={{scale: 0.97}} src={'/member.png'} alt={'image'}
									            className={'bg-yellow-200 border border-secondaryLight cursor-pointer rounded-full w-[100px] aspect-square'}
									            width={500}
									            height={500}/>
								</motion.div>
								<div className={'col-span-3 flex flex-col gap-3'}>
									<div className={''}>
										<label className={'flex flex-col px-2 relative text-sm'}>
											<div className={'text-gray-400 font-medium'}>Member wallet</div>
											<div
												className={'p-2 px-2 pr-8 rounded-lg border bg-primaryLight text-sm border-purple-box'}>{truncateEthAddress(address, 15)}</div>
											<Copy className={'absolute bottom-2.5 right-4 w-5 h-5 cursor-pointer text-purple-box'}
											      onClick={handleCopyAddress}/>
										</label>
									</div>
									<div className={''}>
										<UsernameEdit label={'Username'} onSave={handleSaveUsername} initialValue={username || ''}/>
									</div>
									<div className={cx(me.toLowerCase() === address.toLowerCase() && 'hidden')}>
										<UsernameEdit label={'Custom username'} onSave={handleSaveUsername} initialValue={''}/>
									</div>
									<div className={'text-sm'}>
										<label className={'flex flex-col px-2 py-1 relative'}>
											<span className={'text-gray-400 font-medium'}>Registration date</span>
											<input type="text" value={DateTime.fromMillis(regDate).toFormat("DD T")}
											       className={cx('text-sm p-2 px-4 rounded-lg border bg-primaryLight border-purple-box', regDateOther.isFetching && "blur-sm")}
											       disabled/>
										</label>
									</div>
								</div>
								<div className={'col-span-2 flex flex-col gap-2 '}>
									<div className={'border border-gray-800 bg-primaryLighter rounded-3xl p-6 flex flex-row gap-4'}>
										<People className={'w-12 h-12 text-yellow-400'}/>
										<div className={'flex flex-col justify-center'}>
											<div className={'text-sm'}>Inviter</div>
											{member?.inviter ? <>
												<div className={'font-medium'}>{truncateEthAddress(member.inviter)}</div>
											</> : <>
												<div className={'font-medium text-black bg-black animate-pulse rounded-lg '}>0x000...000</div>
											</>}
										</div>
									</div>
									<div className={'border border-gray-800 bg-primaryLighter rounded-3xl p-6 flex flex-row gap-4'}>
										<Medal className={'w-12 h-12 text-yellow-400'}/>
										<div className={'flex flex-col justify-center'}>
											<div className={'text-sm'}>Network size</div>
											<div className={'font-medium'}>{member.count} direct
												/ {Number(member.countLeft + member.countRight)} total
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={'grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4'}>
								<div className={'col-span-1'}>
									<div className={'text-xl font-semibold py-4 px-2'}>Member's volume</div>
									<div className={'flex flex-col gap-4 '}>
										<div className={'border border-gray-800 bg-primaryLighter rounded-3xl p-6 flex flex-row gap-4'}>
											<Layers3 className={'w-12 h-12 text-yellow-400'}/>
											<div className={'flex flex-col justify-center'}>
												<div className={'text-sm'}>Staking volume</div>
												<div className={'font-medium'}><BetValue value={member.volume} withIcon/>
												</div>
											</div>
										</div>
										<div className={'border border-gray-800 bg-primaryLighter rounded-3xl p-6 flex flex-row gap-4'}>
											<Blackjack className={'w-12 h-12 text-yellow-400'}/>
											<div className={'flex flex-col justify-center'}>
												<div className={'text-sm'}>Betting volume</div>
												<div className={'font-medium'}><BetValue value={member.bets} withIcon/></div>
											</div>
										</div>
									</div>
								</div>
								<div className={'col-span-2'}>
									<div className={'text-xl font-semibold py-4 px-2'}>Member's network volume</div>
									<div
										className={'border border-gray-800 bg-primaryLighter rounded-3xl px-4 py-4 flex flex-row gap-4 relative'}>
										<div
											className={'border border-yellow-400 absolute rounded-xl bg-primaryLighter bottom-0 right-4 w-[80%] text-center sm:w-auto translate-y-1/2 -translate-x-1/2 p-2 px-4`'}>
											<div
												className={'text-yellow-400 font-medium flex flex-row min-w-[200px] items-center justify-center gap-2'}>
												<BetValue precision={2} value={totalVolume} withIcon/>
												<span className={'text-white'}> matching volume</span>
											</div>
										</div>
										<div className={'overflow-x-scroll w-full'}>
											<table className={'w-full text-left'}>
												<thead className={'whitespace-nowrap'}>
												<tr className={'text-gray-400 border-b border-gray-600'}>
													<th className={'w-1/3 pb-4 hidden md:block'}>Product</th>
													<th className={'w-1/3 pb-4 pl-2'}>Direct volume</th>
													<th className={'w-1/3 pb-4 pl-2'}>Binary volume</th>
												</tr>
												</thead>
												<tbody className={'whitespace-nowrap'}>
												<tr className={'border-b border-gray-600'}>
													<td className={'hidden md:table-cell'}>
														<div className={'flex flex-row items-center gap-2'}>
															<Layers3 className={'w-4 h-4 text-yellow-400'}/> Staking
														</div>
													</td>
													<td className={'py-2 pl-2'}>
														<div className={'flex flex-col'}>
															<BetValue value={volume[0]} withIcon/>
															<span className={'text-sm'}>total staking</span>
														</div>
													</td>
													<td className={'py-2 pl-2'}>
														<div className={'flex flex-col'}>
															<BetValue value={member.volumeLeft + member.volumeRight} withIcon/>
															<span className={'text-sm'}>total staking</span>
														</div>
													</td>
												</tr>
												<tr>
													<td className={' hidden md:table-cell'}>
														<div className={'flex flex-row items-center gap-2'}><Blackjack
															className={'w-4 h-4 text-yellow-400'}/> Betting
														</div>
													</td>
													<Tooltip>
														<td className={'py-2 pl-2'}>
															<div className={'flex flex-col'}>
																<BetValue value={(volume[1] / 100n)} withIcon/>
																<span className={'text-sm flex gap-1'}>
														total bets
											<TooltipTrigger>
														<AlertCircle className={'text-yellow-400'} width={18}/>
											</TooltipTrigger>
													</span>
															</div>
														</td>
														<TooltipContent
															className={cx('z-50 border-2 rounded-xl border-[#FFC800] bg-black bg-opacity-75 text-white')}>
															<div className={'px-4 py-2 text-xs'}>
																<p className={'font-bold text-center'}>
																	This value represents <span className={'text-yellow-400'}>100% of all bets</span> <br/> of your <span
																	className={'text-yellow-400'}>direct</span> affiliates
																</p>
															
															</div>
														</TooltipContent>
													</Tooltip>
													<Tooltip>
														<td className={'py-2 pl-2'}>
															<div className={'flex flex-col'}><BetValue
																value={(member.betsLeft / 100n + member.betsRight / 100n)} withIcon/>
																<div className={'text-sm flex gap-1'}>
																	total bets
																	<TooltipTrigger>
																		<AlertCircle className={'text-yellow-400'} width={18}/>
																	</TooltipTrigger>
																</div>
															</div>
														</td>
														<TooltipContent
															className={cx('z-50 border-2 rounded-xl border-[#FFC800] bg-black bg-opacity-75 text-white')}>
															<div className={'px-4 py-2 text-xs'}>
																<p className={'font-bold text-center'}>
																	This value represents <span className={'text-yellow-400'}>1% of all bets</span> <br/> in your <span
																	className={'text-yellow-400'}>binary</span> affiliate system
																</p>
															
															</div>
														</TooltipContent>
													</Tooltip>
												</tr>
												</tbody>
											</table>
										</div>
									
									</div>
								</div>
							</div>
						
						</div>
						<div className={'bg-yellow-400  text-primaryLight w-full'}>
							<Hero className={'w-full'}/>
						</div>
						<div className={'bg-yellow-400 rounded-b-3xl p-6 flex flex-col items-center gap-2'}>
							<div className={'text-black font-semibold'}>Invite link</div>
							<div
								className={'bg-primaryLight rounded-xl p-2 text-xs  px-4 text-white flex flex-row gap-2 items-center cursor-pointer break-all'}
								onClick={handleCopyLink}>
								<LinkIcon className={'w-6 h-6 text-yellow-400'}/>
								{window.origin}/?code={me + address}
							</div>
						</div>
					</motion.div>
				</ScrollArea>
			
			</TooltipProvider>
		</DialogContent>
	</Dialog>
}

export default MemberProfile;


const UsernameEdit: FC<{ label: string, onSave: (username: string) => Promise<boolean>, initialValue: string }> = ({label, onSave, initialValue}) => {
	const {data, close} = useOpenProfile()
	const address = data.address!
	
	const {address: me} = useAccount()
	const [usernameError, setUsernameError] = useState('')
	const [username, setUsername] = useState(initialValue)
	const [editAllowed, setEditAllowed] = useState(false)
	const {data: side} = useSide(me!, address)
	const [loading, setLoading] = useState(false)
	
	const handleUsernameChange = (e: any) => {
		const username = e.target.value
		if (RegExp(/^[a-zA-Z0-9_]{3,32}$/).test(username)) {
			setUsernameError('')
		} else {
			setUsernameError('At least 3 symbols. Allowed: a-z, A-Z, 0-9, _')
		}
		setUsername(username)
	}
	
	const handleEditUsername = () => {
		setEditAllowed(true)
	}
	const handleSaveUsername = async () => {
		setLoading(true)
		if (!RegExp(/^[a-zA-Z0-9_]+$/).test(username)) {
			return
		}
		const result = await onSave(username)
		console.log(result, label)
		if (result) {
			setEditAllowed(false)
		}
		
		setLoading(false)
	}
	const handleClose = () => {
		setEditAllowed(false)
		setUsernameError('')
	}
	return <label className={'flex flex-col px-2 py-1 relative text-sm'}>
		<span className={'text-gray-400 font-medium'}>{label}</span>
		<div className={'absolute text-xs -bottom-3.5 text-red-500'}>{usernameError}</div>
		<Input autoComplete={'one-time-code'} onChange={handleUsernameChange} type="text" value={username}
		       placeholder={username === '' ? 'not set' : ''}
		       className={cx('p-2 px-4 rounded-lg border text-sm bg-primaryLight border-purple-box outline:none active:ring-0 placeholder:text-gray-500 ring-0 focus:outline-0 focus:ring-0 ', usernameError && 'border-red-500')}
		       disabled={!editAllowed}/>
		<div className={cx('flex flex-row gap-2 items-center absolute bottom-2.5 text-sm font-medium h-[26px] rounded-lg bg-gray-600 p-1 px-3 right-4',
			address.toLowerCase() === me?.toLowerCase() && "hidden")}>
			{side === "left" && <><ArrowLeftCircleIcon className={'w-5 h-5'}/> Left</>}
			{side === "right" && <><ArrowRightCircleIcon className={'w-5 h-5'}/> Right</>}
		</div>
		{!editAllowed ? <div onClick={handleEditUsername}
		                     className={cx('flex flex-row gap-2 items-center absolute bottom-2.5 text-sm font-medium h-[26px] cursor-pointer rounded-lg bg-gray-600 p-1 px-3 right-3.5', address.toLowerCase() !== me?.toLowerCase() && "hidden")}>
			<PencilIcon className={'w-4 h-4'}/> Edit
		</div> : <>
			<button onClick={handleSaveUsername} disabled={!!usernameError}
			        className={cx('flex flex-row gap-2 items-center disabled:cursor-not-allowed absolute bottom-2.5 text-sm font-medium h-[26px] cursor-pointer rounded-md bg-green-500 p-1 px-3 right-11', loading && '!hidden', usernameError && "bg-red-500 cursor-pointer", address.toLowerCase() !== me?.toLowerCase() && "hidden")}>
				Save
			</button>
			<Button size={'sm'} onClick={handleClose}
			        className={cx('flex flex-row gap-2 items-center absolute bottom-2.5 text-sm font-medium h-[26px] cursor-pointer rounded-md bg-gray-600 aspect-square justify-center right-3.5')}>
				{loading ? <Loader color={'white'} className={'w-2 h-2'}/> :
					<X className={'w-3 h-3'}/>}
			</Button>
		</>}
	</label>
}