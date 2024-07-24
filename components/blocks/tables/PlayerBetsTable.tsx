import {usePlayerBets} from "@/lib/query/shared.ts";
import BetsTable from "@/components/blocks/tables/BetsTable.tsx";

const PlayerBetsTable = () => {
	
	const {data = [], isFetching, isRefetching} = usePlayerBets(50)
	
	return <BetsTable data={data} isLoading={isFetching || isRefetching}/>
}

export default PlayerBetsTable;