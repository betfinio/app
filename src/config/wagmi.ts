import {fallback, http} from "viem";
import {polygon, polygonAmoy} from "viem/chains";
import {createStorage} from "wagmi";
import {defaultWagmiConfig} from "@web3modal/wagmi";
import {createWeb3Modal} from "@web3modal/wagmi/react";
import {injected, mock, safe, metaMask, walletConnect} from 'wagmi/connectors'


const chains = import.meta.env.PUBLIC_ENVIRONMENT.includes('prod') ? [polygon] : [polygonAmoy]
const chainId = chains[0].id
const config = defaultWagmiConfig({
	metadata: {
		name: 'BetFin',
		description: 'Decentralized staking platform',
		url: import.meta.env.PUBLIC_APP_URL, // origin must match your domain & subdomain
		icons: ['https://betfin.io/favicon.svg']
	},
	connectors: [safe(), injected()],
	chains: chains as any,
	transports: {
		[chainId]: fallback([
			http(import.meta.env.PUBLIC_RPC_URL1!, {batch: true}),
			http(import.meta.env.PUBLIC_RPC_URL2!, {batch: true}),
			http(import.meta.env.PUBLIC_RPC_URL3!, {batch: true}),
		])
	},
	enableInjected: true,
	enableWalletConnect: true,
	enableCoinbase: true,
	multiInjectedProviderDiscovery: true,
	storage: createStorage({
		key: `betfin-${chainId}`
	}),
	auth: {
		email: false,
	},
	projectId: import.meta.env.PUBLIC_WALLETCONNECT_ID,
	ssr: false,
});


createWeb3Modal({
	defaultChain: chains[0],
	wagmiConfig: config,
	tokens: {
		[chainId]: {
			address: import.meta.env.PUBLIC_TOKEN_ADDRESS
		}
	},
	projectId: import.meta.env.PUBLIC_WALLETCONNECT_ID,
	enableAnalytics: false, // Optional - defaults to your Cloud configuration
	enableOnramp: false // Optional - false as default
})

export default config