import { BetValue } from '@/components/ui/BetValue.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog.tsx';
import { Input } from '@/components/ui/input.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import faviconSvg from '@/src/assets/favicon.svg';

import { toast } from '@/components/ui/use-toast.ts';
import { useInviteStakingVolume, useTreeMember } from '@/lib/query/affiliate.ts';
import { useOpenProfile, useRegistrationDate, useSide } from '@/lib/query/shared.ts';
import { useChangeCustomUsername, useChangeUsername, useCustomUsername, useUsername } from '@/lib/query/username.ts';
import { defaultTreeMember } from '@/lib/types';
import { ZeroAddress } from '@betfinio/abi';
import { truncateEthAddress, valueToNumber } from '@betfinio/abi/dist';
import { Blackjack, Hero, People } from '@betfinio/ui/dist/icons';
import cx from 'clsx';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeftCircleIcon, ArrowRightCircleIcon, CheckIcon, Copy, Layers3, LinkIcon, Loader, Medal, PencilIcon, X } from 'lucide-react';
import { DateTime } from 'luxon';
import { type ChangeEvent, type FC, type PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const fadeIn = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 0.5 },
};

const FadeInDiv = ({ key, children }: PropsWithChildren<{ key: number }>) => {
	return (
		<motion.div key={key} initial={fadeIn.initial} transition={fadeIn.transition} animate={fadeIn.animate}>
			{children}
		</motion.div>
	);
};

const MemberProfile = () => {
	const { t } = useTranslation('', { keyPrefix: 'shared.profileModal' });

	const { data, close } = useOpenProfile();
	const { address: me } = useAccount();
	const { data: regDate = 0, ...regDateOther } = useRegistrationDate(data.address || ZeroAddress);
	const { data: member = defaultTreeMember } = useTreeMember(data.address || ZeroAddress);
	const { data: bettingVolume = 0n } = useInviteStakingVolume(data.address || ZeroAddress);
	const { data: stakingVolume = 0n } = useInviteStakingVolume(data.address || ZeroAddress);
	const { data: username } = useUsername(data.address || ZeroAddress);
	const { data: customUsername = '' } = useCustomUsername(me || ZeroAddress, data.address || ZeroAddress);
	const { mutate: saveUsername } = useChangeUsername();
	const { mutate: saveCustomUsername } = useChangeCustomUsername();
	const volume = [stakingVolume, bettingVolume];
	const handleClose = () => {
		close();
	};

	const totalVolume = useMemo(() => {
		return member ? valueToNumber(member.volumeLeft + member.volumeRight + member.betsRight / 100n + member.betsLeft / 100n) : 0;
	}, [member]);

	const [addressCopied, setAddressCopied] = useState(false);
	const [linkCopied, setLinkCopied] = useState(false);
	const address = data.address;
	const link = useMemo<string>(() => {
		if (!me || !address) return '';
		return `${window.origin}/academy/new?code=${me + address}`;
	}, [me, address]);
	if (!data.open || !address || !me) return null;

	const handleCopyAddress = async () => {
		toast({
			title: t('copied'),
			variant: 'default',
		});
		await navigator.clipboard.writeText(address);
		setAddressCopied(true);
		setTimeout(() => {
			setAddressCopied(false);
		}, 5000);
	};

	const handleSaveUsername = async (username: string) => {
		saveUsername(username);
		return true;
	};
	const handleSaveCustomUsername = async (username: string) => {
		saveCustomUsername({ username, address });
		return true;
	};

	const handleCopyLink = async (text: string) => {
		toast({
			title: t('copied'),
			variant: 'default',
		});
		await navigator.clipboard.writeText(text);
		setLinkCopied(true);
		setTimeout(() => {
			setLinkCopied(false);
		}, 5000);
	};
	return (
		<Dialog open={true} onOpenChange={handleClose}>
			<DialogContent aria-describedby={undefined} className={'lg:min-w-[1000px]'}>
				<DialogTitle className={'hidden'} />
				<TooltipProvider delayDuration={0}>
					<ScrollArea className={'max-h-[100vh]'}>
						<motion.div className={'mx-auto text-white w-full rounded-3xl  bg-primaryLight'}>
							<div className={'p-4 lg:p-8 mb-10 relative'}>
								<DialogClose onClick={handleClose}>
									<X
										className={
											'absolute top-4 right-4 w-6 h-6 p-1 border-2 border-white rounded-full cursor-pointer hover:text-red-roulette hover:border-red-roulette duration-300'
										}
									/>
								</DialogClose>

								<div className={'flex items-center justify-center text-lg font-semibold'}>{t('title')}</div>
								<div className={'grid lg:grid-cols-6 grid-cols-1 gap-0 lg:gap-4 my-4'}>
									<motion.div className={'col-span-1 py-4'}>
										<motion.img
											whileHover={{ scale: 1.03 }}
											whileTap={{ scale: 0.97 }}
											src={faviconSvg as string}
											alt={'logo'}
											className={'bg-primaryLighter border border-secondaryLight cursor-pointer rounded-full w-[100px] aspect-square'}
											width={500}
											height={500}
										/>
									</motion.div>
									<div className={'col-span-3 flex flex-col gap-3'}>
										<div className={''}>
											<label className={'flex flex-col px-2 relative text-sm'}>
												<div className={'text-gray-400 font-medium'}>{t('wallet')}</div>
												<div className={'p-2 px-2 pr-8 rounded-lg border bg-primaryLight text-sm border-purple-box'}>{truncateEthAddress(address, 15)}</div>
												<div className={'absolute bottom-2.5 right-4 w-5 h-5'}>
													{addressCopied ? (
														<FadeInDiv key={1}>
															<CheckIcon className={'text-green-500 '} />
														</FadeInDiv>
													) : (
														<FadeInDiv key={2}>
															<Copy className={'text-purple-box cursor-pointer'} onClick={handleCopyAddress} />
														</FadeInDiv>
													)}
												</div>
											</label>
										</div>
										<div className={''}>
											<UsernameEdit
												label={t('username')}
												onSave={handleSaveUsername}
												allowEdit={me.toLowerCase() === address.toLowerCase()}
												initialValue={username || ''}
											/>
										</div>
										<div className={cx(me.toLowerCase() === address.toLowerCase() && 'hidden')}>
											<UsernameEdit label={t('customUsername')} onSave={handleSaveCustomUsername} allowEdit={true} initialValue={customUsername} />
										</div>
										<div className={'text-sm'}>
											<label className={'flex flex-col px-2 py-1 relative'}>
												<span className={'text-gray-400 font-medium'}>{t('registration')}</span>
												<input
													type="text"
													value={regDate > 0 ? DateTime.fromMillis(regDate).toFormat('DD T') : 'Unknown'}
													className={cx('text-sm p-2 px-4 rounded-lg border bg-primaryLight border-purple-box', regDateOther.isFetching && 'blur-sm')}
													disabled
												/>
											</label>
										</div>
									</div>
									<div className={'col-span-2 flex flex-col gap-2 '}>
										<div className={'border border-gray-800 bg-primaryLighter rounded-3xl p-6 flex flex-row gap-4'}>
											<People className={'w-12 h-12 text-yellow-400'} />
											<div className={'flex flex-col justify-center'}>
												<div className={'text-sm'}>{t('inviter')}</div>
												{member?.inviter ? (
													<>
														<div className={'font-medium'}>{truncateEthAddress(member.inviter)}</div>
													</>
												) : (
													<>
														<div className={'font-medium text-black bg-black animate-pulse rounded-lg '}>0x000...000</div>
													</>
												)}
											</div>
										</div>
										<div className={'border border-gray-800 bg-primaryLighter rounded-3xl p-6 flex flex-row gap-4'}>
											<Medal className={'w-12 h-12 text-yellow-400'} />
											<div className={'flex flex-col justify-center'}>
												<div className={'text-sm'}>{t('network')}</div>
												<div className={'font-medium'}>
													{member.count} {t('direct')} / {Number(member.countLeft + member.countRight)} {t('total')}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className={'grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4'}>
									<div className={'col-span-1'}>
										<div className={'text-xl font-semibold py-4 px-2'}>{t('volume.title')}</div>
										<div className={'flex flex-col gap-4 '}>
											<div className={'border border-gray-800 bg-primaryLighter rounded-3xl p-6 flex flex-row gap-4'}>
												<Layers3 className={'w-12 h-12 text-yellow-400'} />
												<div className={'flex flex-col justify-center'}>
													<div className={'text-sm'}>{t('volume.staking')}</div>
													<div className={'font-medium'}>
														<BetValue value={member.volume} withIcon />
													</div>
												</div>
											</div>
											<div className={'border border-gray-800 bg-primaryLighter rounded-3xl p-6 flex flex-row gap-4'}>
												<Blackjack className={'w-12 h-12 text-yellow-400'} />
												<div className={'flex flex-col justify-center'}>
													<div className={'text-sm'}>{t('volume.betting')}</div>
													<div className={'font-medium'}>
														<BetValue value={member.bets} withIcon />
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className={'col-span-2'}>
										<div className={'text-xl font-semibold py-4 px-2'}>{t('networkTable.title')}</div>
										<div className={'border border-gray-800 bg-primaryLighter rounded-3xl px-4 py-4 flex flex-row gap-4 relative'}>
											<div
												className={
													'border border-yellow-400 absolute rounded-xl bg-primaryLighter bottom-0 right-4 w-[80%] text-center sm:w-auto translate-y-1/2 -translate-x-1/2 p-2 px-4`'
												}
											>
												<div className={'text-yellow-400 font-medium flex flex-row min-w-[200px] items-center justify-center gap-2'}>
													<BetValue precision={2} value={totalVolume} withIcon />
													<span className={'text-white'}> {t('networkTable.matching')}</span>
												</div>
											</div>
											<div className={'overflow-x-hidden w-full'}>
												<table className={'w-full text-left overflow-x-hidden'}>
													<thead className={'whitespace-nowrap'}>
														<tr className={'text-gray-400 border-b border-gray-600'}>
															<th className={'w-1/3 pb-4 hidden md:block'}>{t('networkTable.product')}</th>
															<th className={'w-1/3 pb-4 pl-2'}>{t('networkTable.direct')}</th>
															<th className={'w-1/3 pb-4 pl-2'}>{t('networkTable.binary')}</th>
														</tr>
													</thead>
													<tbody className={'whitespace-nowrap'}>
														<tr className={'border-b border-gray-600'}>
															<td className={'hidden md:table-cell'}>
																<div className={'flex flex-row items-center gap-2'}>
																	<Layers3 className={'w-4 h-4 text-yellow-400'} /> {t('networkTable.staking')}
																</div>
															</td>
															<td className={'py-2 pl-2'}>
																<div className={'flex flex-col'}>
																	<BetValue value={volume[0]} withIcon />
																	<span className={'text-sm'}>{t('networkTable.totalStaking')}</span>
																</div>
															</td>
															<td className={'py-2 pl-2'}>
																<div className={'flex flex-col'}>
																	<BetValue value={member.volumeLeft + member.volumeRight} withIcon />
																	<span className={'text-sm'}>{t('networkTable.totalStaking')}g</span>
																</div>
															</td>
														</tr>
														<tr>
															<td className={'hidden md:table-cell'}>
																<div className={'flex flex-row items-center gap-2'}>
																	<Blackjack className={'w-4 h-4 text-yellow-400'} /> {t('networkTable.betting')}
																</div>
															</td>
															<td className={'py-2 pl-2'}>
																<div className={'flex flex-col'}>
																	<BetValue value={volume[1] / 100n} withIcon />
																	<div className={'text-sm flex gap-1'}>
																		{t('networkTable.totalBets')}
																		<Tooltip>
																			<TooltipTrigger>
																				<AlertCircle className={'text-yellow-400'} width={18} />
																			</TooltipTrigger>
																			<TooltipContent className={cx('z-50 border- rounded-xl border-yellow-400 bg-black text-white')}>
																				<div className={'px-4 py-2 text-xs'}>
																					<p className={'font-semibold text-center'}>
																						This value represents <span className={'text-yellow-400'}>100% of all bets</span> <br /> of your{' '}
																						<span className={'text-yellow-400'}>direct</span> affiliates
																					</p>
																				</div>
																			</TooltipContent>
																		</Tooltip>
																	</div>
																</div>
															</td>

															<td className={'py-2 pl-2'}>
																<div className={'flex flex-col'}>
																	<BetValue value={member.betsLeft / 100n + member.betsRight / 100n} withIcon />
																	<div className={'text-sm flex gap-1'}>
																		{t('networkTable.totalBets')}
																		<Tooltip>
																			<TooltipTrigger>
																				<AlertCircle className={'text-yellow-400'} width={18} />
																			</TooltipTrigger>
																			<TooltipContent className={cx('z-50 border-2 rounded-xl border-yellow-400 bg-black bg-opacity-75 text-white')}>
																				<div className={'px-4 py-2 text-xs'}>
																					<p className={'font-semibold text-center'}>
																						This value represents <span className={'text-yellow-400'}>1% of all bets</span> <br /> in your{' '}
																						<span className={'text-yellow-400'}>binary</span> affiliate system
																					</p>
																				</div>
																			</TooltipContent>
																		</Tooltip>
																	</div>
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={'bg-yellow-400  text-primaryLight w-full'}>
								<Hero className={'w-full'} />
							</div>
							<div className={'bg-yellow-400 rounded-b-3xl p-6 flex flex-col items-center gap-2 w-full'}>
								<div className={'text-black font-semibold'}>{t('link')}</div>
								<div
									className={
										'bg-primaryLight rounded-xl p-2 text-xs line-clamp-1 overflow-ellipsis max-w-[90%]  px-4 text-white flex flex-row gap-2 items-center cursor-pointer break-all'
									}
									onClick={() => handleCopyLink(link)}
								>
									<div className={'w-6 h-6'}>
										{linkCopied ? (
											<FadeInDiv key={3}>
												<CheckIcon className={'text-green-500 '} />
											</FadeInDiv>
										) : (
											<FadeInDiv key={4}>
												<LinkIcon className={' text-yellow-400'} />
											</FadeInDiv>
										)}
									</div>

									<span className={'line-clamp-1 overflow-ellipsis w-full'}>{link}</span>
								</div>
							</div>
						</motion.div>
					</ScrollArea>
				</TooltipProvider>
			</DialogContent>
		</Dialog>
	);
};

export default MemberProfile;

const UsernameEdit: FC<{
	label: string;
	allowEdit: boolean;
	onSave: (username: string) => Promise<boolean>;
	initialValue: string;
}> = ({ label, allowEdit, onSave, initialValue }) => {
	const { data } = useOpenProfile();
	const address = data.address;
	const { address: me = ZeroAddress } = useAccount();
	const [usernameError, setUsernameError] = useState('');
	const [username, setUsername] = useState(initialValue);
	const [editAllowed, setEditAllowed] = useState(false);
	const { data: side } = useSide(me, address || ZeroAddress);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setUsername(initialValue);
	}, [initialValue]);

	const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const username = e.target.value;
		if (RegExp(/^[a-zA-Z0-9_]{3,32}$/).test(username)) {
			setUsernameError('');
		} else {
			setUsernameError('At least 3 symbols. Allowed: a-z, A-Z, 0-9, _');
		}
		setUsername(username);
	};

	const handleEditUsername = () => {
		setEditAllowed(true);
	};
	const handleSaveUsername = async () => {
		setLoading(true);
		if (!RegExp(/^[a-zA-Z0-9_]+$/).test(username)) {
			return;
		}
		const result = await onSave(username);
		if (result) {
			setEditAllowed(false);
		}

		setLoading(false);
	};
	const handleClose = () => {
		setEditAllowed(false);
		setUsernameError('');
	};
	return (
		<label className={'flex flex-col px-2 py-1 relative text-sm'}>
			<span className={'text-gray-400 font-medium'}>{label}</span>
			<div className={'absolute text-xs -bottom-3.5 text-red-500'}>{usernameError}</div>
			<Input
				autoComplete={'one-time-code'}
				onChange={handleUsernameChange}
				type="text"
				value={username}
				placeholder={username === '' ? 'not set' : ''}
				className={cx(
					'p-2 px-4 rounded-lg border text-sm bg-primaryLight border-purple-box outline:none active:ring-0 placeholder:text-gray-500 ring-0 focus:outline-0 focus:ring-0 ',
					usernameError && 'border-red-500',
				)}
				disabled={!editAllowed}
			/>
			<div
				className={cx(
					'flex flex-row gap-2 items-center absolute bottom-2.5 text-sm font-medium h-[26px] rounded-lg bg-gray-600 p-1 px-3 right-4',
					allowEdit && 'hidden',
				)}
			>
				{side === 'left' && (
					<>
						<ArrowLeftCircleIcon className={'w-5 h-5'} /> Left
					</>
				)}
				{side === 'right' && (
					<>
						<ArrowRightCircleIcon className={'w-5 h-5'} /> Right
					</>
				)}
			</div>
			{!editAllowed ? (
				<div
					onClick={handleEditUsername}
					className={cx(
						'flex flex-row gap-2 items-center absolute bottom-2.5 text-sm font-medium h-[26px] cursor-pointer rounded-lg bg-gray-600 p-1 px-3 right-3.5',
						!allowEdit && 'hidden',
					)}
				>
					<PencilIcon className={'w-4 h-4'} /> Edit
				</div>
			) : (
				<>
					<button
						type={'button'}
						onClick={handleSaveUsername}
						disabled={!!usernameError}
						className={cx(
							'flex flex-row gap-2 items-center disabled:cursor-not-allowed absolute bottom-2.5 text-sm font-medium h-[26px] cursor-pointer rounded-md bg-green-500 p-1 px-3 right-11',
							loading && '!hidden',
							usernameError && 'bg-red-500 cursor-pointer',
							!allowEdit && 'hidden',
						)}
					>
						Save
					</button>
					<Button
						size={'sm'}
						onClick={handleClose}
						className={cx(
							'flex flex-row gap-2 items-center absolute bottom-2.5 text-sm font-medium px-0 h-[26px] cursor-pointer rounded-md bg-gray-600 aspect-square justify-center right-3.5',
						)}
					>
						{loading ? <Loader color={'white'} className={'w-2 h-2'} /> : <X className={'w-3 h-3'} />}
					</Button>
				</>
			)}
		</label>
	);
};
