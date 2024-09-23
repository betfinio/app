import { Button } from '@/components/ui/button.tsx';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { getTransactionLink } from '@/lib/helpers.tsx';
import { useAllowance, useIncreaseAllowance } from '@/lib/query/token.ts';
import { ILanguageKeys } from '@/src/i18next';
import { valueToNumber } from '@betfinio/abi/dist';
import { Bet } from '@betfinio/ui/dist/icons';
import cx from 'clsx';
import { CircleCheck, HandCoins, Loader, Signature, X } from 'lucide-react';
import { type FC, type PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';
type State = 'allowance' | 'transaction' | 'result';
type RequestType = 'stake' | 'bet';
interface AllowanceContextProps {
	requestAllowance?: (type: RequestType, amount: bigint) => void;
	state?: State;
	type?: RequestType;
	amount?: bigint;
	requested?: boolean;
	setResult?: (data: Address) => void;
}

const AllowanceContext = createContext<AllowanceContextProps>({});

export const AllowanceProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, setState] = useState<State>('allowance');
	const [open, setOpen] = useState(false);
	const [requested, setRequested] = useState(false);
	const [type, setType] = useState<RequestType | undefined>();
	const [amount, setAmount] = useState<bigint | undefined>();
	const [data, setData] = useState<Address | undefined>();
	const requestAllowance = (type: RequestType, _amount: bigint) => {
		setState('allowance');
		setOpen(true);
		setRequested(false);
		setType(type);
		setAmount(_amount);
		setData(undefined);
	};
	const handleRequested = () => {
		open && setRequested(true);
	};
	const setResult = (data: Address) => {
		setData(data);
		setState('result');
		setRequested(false);
	};
	return (
		<AllowanceContext.Provider value={{ requestAllowance, type, state, amount, requested, setResult }}>
			{children}
			<RequestModal open={open} onClose={() => setOpen(false)} onStateChange={setState} data={data} onRequested={handleRequested} />
		</AllowanceContext.Provider>
	);
};

export const useAllowanceModal = () => {
	return useContext(AllowanceContext);
};

function RequestModal({
	open,
	onClose,
	onStateChange,
	data,
	onRequested,
}: {
	open: boolean;
	onClose: () => void;
	data?: Address;
	onStateChange: (state: State) => void;
	onRequested: () => void;
}) {
	const { state, type, amount = 0n } = useAllowanceModal();
	const { t } = useTranslation('shared', { keyPrefix: 'allowanceModal' });
	const { mutate: increase, isPending: isApproving } = useIncreaseAllowance();
	const { address } = useAccount();
	const { data: allowance = 0n } = useAllowance(address);
	useEffect(() => {
		if (!data) {
			if (allowance > amount) {
				onStateChange('transaction');
			} else {
				onStateChange('allowance');
			}
		}
	}, [allowance, amount, data]);
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className={'games'}>
				<DialogTitle className={'hidden'} />
				<DialogDescription className={'hidden'} />
				<div className={'p-2 md:p-3 lg:p-4 text-white'} style={{ minWidth: '360px' }}>
					<div className={'flex items-center flex-row justify-end gap-2'}>
						<div className={'flex-grow'} />
						<DialogClose>
							<X className={'cursor-pointer'} />
						</DialogClose>
					</div>
					<div className={'flex flex-col items-start'}>
						<div className={'text-gray-500 text-sm'}>{type && t(`type.${type}`)}</div>
						<div className={'flex flex-row justify-between w-full py-2'}>
							<div className={'text-xl'}>{valueToNumber(amount)}</div>
							<Bet className={'w-6 h-6'} />
						</div>
						<Separator />
						<div className={'py-2 flex flex-col items-start gap-2 w-full'}>
							<div className={cx('flex flex-row items-center justify-between w-full gap-2', state === 'allowance' && 'text-yellow-400')}>
								<div className={'rounded-full p-2 bg-gray-800'}>
									<div className={'flex flex-col'}>
										{isApproving ? (
											<Loader className={'w-6 h-6 animate-spin'} />
										) : allowance > amount ? (
											<CircleCheck className={'w-6 h-6 text-green-500'} />
										) : (
											<Signature className={'w-6 h-6'} />
										)}
									</div>
								</div>
								<div className={'flex-grow'}>{isApproving ? 'Approving...' : 'Approve allowance'}</div>
								{state === 'allowance' && (
									<Button className={'h-auto rounded-full py-1'} disabled={isApproving} onClick={() => increase()}>
										Approve
									</Button>
								)}
							</div>
							{state === 'allowance' && <div className={'border-r border-gray-800 h-6 w-5'} />}
							<div
								className={cx('flex flex-row items-center justify-between w-full gap-2', {
									'text-yellow-400': state === 'transaction',
									'text-gray-400': state === 'allowance',
								})}
							>
								<div className={'rounded-full p-2 bg-gray-800'}>
									<div className={'flex flex-col'}>
										<HandCoins className={'w-6 h-6'} />
									</div>
								</div>
								<div className={'flex-grow'}>Execute transaction</div>
								{state === 'transaction' && (
									<Button className={'h-auto rounded-full py-1'} onClick={onRequested}>
										Execute
									</Button>
								)}
							</div>
							{state === 'transaction' && <div className={'border-r border-gray-800 h-6 w-5'} />}
							<div className={cx('flex flex-row items-center gap-2', state !== 'result' ? 'text-gray-500' : ' text-green-500')}>
								<div className={'rounded-full p-2 bg-gray-800'}>
									<div className={'flex flex-col'}>
										<CircleCheck className={'w-6 h-6'} />
									</div>
								</div>
								{data !== undefined ? getTransactionLink(data, 'Transaction') : 'Result'}
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
