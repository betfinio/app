import BetsTable from '@/components/blocks/tables/BetsTable';
import { useBets } from '@/lib/query/shared';

const AllBetsTable = () => {
	const { data = [], isFetching, isRefetching } = useBets(50);

	return <BetsTable data={data} isLoading={isFetching || isRefetching} />;
};

export default AllBetsTable;
