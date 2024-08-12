import { BetValue } from '@/components/ui/BetValue.tsx';
import { DataTable } from '@/components/ui/DataTable.tsx';
import type { BetInterface } from '@/lib/types';
import { ZeroAddress, truncateEthAddress, valueToNumber } from '@betfinio/abi';
import { Predict, Roulette } from '@betfinio/ui/dist/icons';
import { createColumnHelper } from '@tanstack/react-table';
import { SquareArrowOutUpRight } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { Address } from 'viem';

const ETHSCAN = import.meta.env.PUBLIC_ETHSCAN;

const columnHelper = createColumnHelper<BetInterface>();

const BetsTable: FC<{ data: BetInterface[]; isLoading: boolean }> = ({ data, isLoading }) => {
	const { t } = useTranslation('', { keyPrefix: 'shared.homepage.tables' });
	const renderGameIcon = (game: Address) => {
		if (game.toLowerCase() === import.meta.env.PUBLIC_PREDICT_ADDRESS.toLowerCase()) {
			return <Predict className={'w-6 h-6'} />;
		}
		return <Roulette className={'w-6 h-6'} />;
	};
	const columns = [
		columnHelper.accessor('game', {
			header: '',
			meta: {
				className: 'w-14',
			},
			cell: (props) => (
				<a target={'_blank'} href={`${ETHSCAN}/address/${props.getValue()}`} className={'text-gray-400'} rel="noreferrer">
					{renderGameIcon(props.getValue() as Address)}
				</a>
			),
		}),
		columnHelper.accessor('hash', {
			header: t('transaction'),
			cell: (props) => (
				<a
					href={`${ETHSCAN}/tx/${props.getValue()}`}
					target={'_blank'}
					className={'text-blue-600 flex flex-row items-center whitespace-nowrap gap-1 cursor-pointer'}
					rel="noreferrer"
				>
					{truncateEthAddress(props.getValue() || ZeroAddress)}
					<SquareArrowOutUpRight className={'w-3'} />
				</a>
			),
		}),
		columnHelper.accessor('player', {
			enableColumnFilter: true,
			header: t('player'),
			cell: (props) => (
				<a
					href={`${ETHSCAN}/address/${props.getValue()}`}
					target={'_blank'}
					className={'text-blue-600 flex flex-row items-start gap-1 whitespace-nowrap cursor-pointer'}
					rel="noreferrer"
				>
					{props.row.original.customUsername || props.row.original.username || truncateEthAddress(props.getValue())}
					<SquareArrowOutUpRight className={'w-3'} />
				</a>
			),
		}),
		columnHelper.accessor('amount', {
			header: t('amount'),
			cell: (props) => <BetValue value={valueToNumber(props.getValue())} withIcon />,
		}),
	];

	// @ts-ignore
	return <DataTable columns={columns} data={data} isLoading={isLoading} />;
};

export default BetsTable;
