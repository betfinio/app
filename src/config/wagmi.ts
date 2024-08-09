import { defaultWagmiConfig } from '@web3modal/wagmi';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { http, type Chain, fallback } from 'viem';
import { polygon, polygonAmoy } from 'viem/chains';
import { createStorage, parseCookie } from 'wagmi';
import { injected, metaMask } from 'wagmi/connectors';

const cookieStorage = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	getItem(key: any) {
		if (typeof window === 'undefined') return null;
		const value = parseCookie(document.cookie, key);
		return value ?? null;
	},
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	setItem(key: any, value: any) {
		if (typeof window === 'undefined') return;
		document.cookie = `${key}=${value}`;
	},
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	removeItem(key: any) {
		if (typeof window === 'undefined') return;
		document.cookie = `${key}=;max-age=-1`;
	},
};

const chains: [Chain] = import.meta.env.PUBLIC_ENVIRONMENT.includes('prod') ? [polygon] : [polygonAmoy];
const chainId = chains[0].id;
const config = defaultWagmiConfig({
	metadata: {
		name: 'BetFin',
		description: 'Decentralized staking platform',
		url: import.meta.env.PUBLIC_APP_URL, // origin must match your domain & subdomain
		icons: ['https://betfin.io/favicon.svg'],
	},
	connectors: [
		injected({ target: 'metaMask', shimDisconnect: true }),
		metaMask({
			preferDesktop: true,
			injectProvider: true,
			forceInjectProvider: true,
		}),
	],
	chains: chains,
	transports: {
		[chainId]: fallback([
			http(import.meta.env.PUBLIC_RPC_URL1, { batch: true }),
			http(import.meta.env.PUBLIC_RPC_URL2, { batch: true }),
			http(import.meta.env.PUBLIC_RPC_URL3, { batch: true }),
		]),
	},
	enableInjected: true,
	enableCoinbase: false,
	enableWalletConnect: true,
	multiInjectedProviderDiscovery: true,
	storage: createStorage({
		storage: cookieStorage,
	}),
	auth: {
		email: false,
	},
	projectId: import.meta.env.PUBLIC_WALLETCONNECT_ID,
	ssr: true,
});

createWeb3Modal({
	defaultChain: chains[0],
	wagmiConfig: config,
	tokens: {
		[chainId]: {
			address: import.meta.env.PUBLIC_TOKEN_ADDRESS,
		},
	},
	projectId: import.meta.env.PUBLIC_WALLETCONNECT_ID,
	enableAnalytics: true, // Optional - defaults to your Cloud configuration
	enableOnramp: false, // Optional - false as default
});

export default config;
