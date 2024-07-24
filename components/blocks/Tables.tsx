import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useTranslation} from "react-i18next";
import PlayerBetsTable from "@/components/blocks/tables/PlayerBetsTable.tsx";
import AllBetsTable from "@/components/blocks/tables/AllBetsTable.tsx";
import StakesTable from "@/components/blocks/tables/StakesTable.tsx";

const Tables = () => {
	const {t} = useTranslation('', {keyPrefix: 'shared.homepage.tables'})
	return <Tabs defaultValue="allBets" className="w-full">
		<TabsList>
			<TabsTrigger value="allBets">{t('allBets')}</TabsTrigger>
			<TabsTrigger value="myBets">{t('myBets')}</TabsTrigger>
			<TabsTrigger value="allStakes">{t('allStakes')}</TabsTrigger>
		</TabsList>
		<TabsContent value="allBets">
			<AllBetsTable/>
		</TabsContent>
		<TabsContent value="myBets">
			<PlayerBetsTable/>
		</TabsContent>
		<TabsContent value="allStakes">
			<StakesTable/>
		</TabsContent>
	</Tabs>
}

export default Tables