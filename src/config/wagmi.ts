import {getDefaultConfig} from "@rainbow-me/rainbowkit";
import {fallback, http} from "viem";
import {polygon, polygonAmoy} from "viem/chains";
import {createStorage} from "wagmi";


const chains = import.meta.env.NODE_ENV === 'production' ? [polygon] : [polygonAmoy]
const chainId = chains[0].id

const config = getDefaultConfig({
	appName: 'BetFin.io app',
	chains: chains as any,
	transports: {
		[chainId]: fallback([
			http(import.meta.env.PUBLIC_RPC_URL1!, {batch: true}),
			http(import.meta.env.PUBLIC_RPC_URL2!, {batch: true}),
			http(import.meta.env.PUBLIC_RPC_URL3!, {batch: true}),
		])
	},
	storage: createStorage({
		key: 'betfinio',
	}),
	projectId: import.meta.env.PUBLIC_WALLETCONNECT_ID,
	ssr: false,
	appUrl: "https://betfin.io",
});

console.log(config.getClient())

export default config