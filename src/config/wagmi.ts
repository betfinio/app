import {fallback, http} from "viem";
import {polygon, polygonAmoy} from "viem/chains";
import {createStorage} from "wagmi";
import {defaultWagmiConfig} from "@web3modal/wagmi";
import {createWeb3Modal} from "@web3modal/wagmi/react";


const chains = import.meta.env.PUBLIC_ENVIRONMENT === 'production' ? [polygon] : [polygonAmoy]
const chainId = chains[0].id
const config = defaultWagmiConfig({
	metadata: {
		name: 'BetFin.io',
		description: 'Decentralized staking platform',
		url: 'https://app.betfin.io/', // origin must match your domain & subdomain
		icons: ['https://betfin.io/favicon.svg']
	},
	chains: chains as any,
	transports: {
		[chainId]: fallback([
			http(import.meta.env.PUBLIC_RPC_URL1!, {batch: true}),
			http(import.meta.env.PUBLIC_RPC_URL2!, {batch: true}),
			http(import.meta.env.PUBLIC_RPC_URL3!, {batch: true}),
		])
	},
	enableInjected: true,
	enableEIP6963: true,
	enableWalletConnect: true,
	storage: createStorage({
		key: `betfin-${chainId}`
	}),
	auth: {
		email: false
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