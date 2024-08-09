import { MiniChart } from 'react-ts-tradingview-widgets';

const BetChart = () => {
	return (
		<MiniChart
			symbol={'UNISWAP3POLYGON:BETUSDT_549BB7.USD'}
			copyrightStyles={{ span: { display: 'hidden' } }}
			trendLineColor={'#facc15'}
			underLineColor={'#6A6A9F'}
			underLineBottomColor={'#201C40'}
			// @ts-ignore
			noTimeScale={true}
			colorTheme="dark"
			width={'100%'}
			height={150}
		/>
	);
};
export default BetChart;
