import { BetValue } from '@/components/ui/BetValue.tsx';
import { DataTable } from '@/components/ui/DataTable.tsx';
import { useAllStakes } from '@/lib/query/shared.ts';
import type { Stake } from '@/lib/types';
import { ZeroAddress, truncateEthAddress, valueToNumber } from '@betfinio/abi';
import { Bag, Bank } from '@betfinio/ui/dist/icons';
import { Link } from '@tanstack/react-router';
import { createColumnHelper } from '@tanstack/react-table';
import { SquareArrowOutUpRight } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const columnHelper = createColumnHelper<Stake>();

const StakesTable: FC = () => {
	const { t } = useTranslation('shared');
	const { data = [], isLoading, isFetching } = useAllStakes(10);
	const getStakingIcon = (staking: string) => {
		if (staking.toLowerCase() === import.meta.env.PUBLIC_CONSERVATIVE_STAKING_ADDRESS.toLowerCase()) {
			return <Bank className={'w-6 h-6'} />;
		}
		return <Bag className={'w-6 h-6'} />;
	};
	const columns = [
		columnHelper.accessor('staking', {
			header: '',
			id: 'icon',
			meta: {
				className: 'w-14',
			},
			cell: (props) => (
				<Link target={'_blank'} to={`${import.meta.env.PUBLIC_ETHSCAN}/address/${props.getValue()}`} className={'text-gray-400'}>
					{getStakingIcon(props.getValue() as string)}
				</Link>
			),
		}),
		columnHelper.accessor('hash', {
			header: t('tables.stakesTable.transaction'),
			cell: (props) => (
				<a
					href={`${import.meta.env.PUBLIC_ETHSCAN}/tx/${props.getValue()}`}
					target={'_blank'}
					className={'text-blue-600 flex flex-row items-start whitespace-nowrap gap-1 cursor-pointer'}
					rel="noreferrer"
				>
					{truncateEthAddress(props.getValue() || ZeroAddress)}
					<SquareArrowOutUpRight className={'w-[14px] h-[16px]'} />
				</a>
			),
		}),
		columnHelper.accessor('staker', {
			enableColumnFilter: true,
			header: t('tables.stakesTable.staker'),
			cell: (props) => (
				<a
					href={`${import.meta.env.PUBLIC_ETHSCAN}/address/${props.getValue()}`}
					target={'_blank'}
					className={'text-blue-600 flex flex-row items-start gap-1 whitespace-nowrap cursor-pointer'}
					rel="noreferrer"
				>
					{props.row.original.customUsername || props.row.original.username || truncateEthAddress(props.getValue())}
					<SquareArrowOutUpRight className={'w-[14px] h-[16px]'} />
				</a>
			),
		}),
		columnHelper.accessor('amount', {
			header: t('tables.stakesTable.amount'),
			cell: (props) => <BetValue value={valueToNumber(props.getValue())} withIcon />,
		}),
	];

	// @ts-ignore
	return <DataTable columns={columns} data={data} isLoading={isLoading || isFetching} />;
};

export default StakesTable;
