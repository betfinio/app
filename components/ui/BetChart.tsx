import {MiniChart} from "react-ts-tradingview-widgets";

const BetChart = () => {
	// @ts-ignore
	return <MiniChart symbol={'UNISWAP3POLYGON:BETUSDT_549BB7.USD'} noTimeScale={true} colorTheme="dark" width={'100%'} height={150}/>
}
export default BetChart