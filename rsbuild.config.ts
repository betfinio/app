import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {pluginSass} from '@rsbuild/plugin-sass';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';
// @ts-ignore
import {TanStackRouterRspack} from '@tanstack/router-plugin/rspack'
// @ts-ignore
import {dependencies} from "./package.json";

const getStaking = () => {
	switch (process.env.PUBLIC_ENVIRONMENT) {
		case 'development':
			return 'betfinio_staking@https://betfin-staking-dev.web.app/mf-manifest.json'
		case 'production':
			return 'betfinio_staking@https://staking.betfin.io/mf-manifest.json'
		default:
			return 'betfinio_staking@http://localhost:3000/mf-manifest.json'
	}
}

export default defineConfig({
	server: {
		port: 5555,
	},
	dev: {
		assetPrefix: 'http://localhost:5555',
	},
	html: {
		title: 'BetFin',
		favicon: './src/assets/favicon.svg',
	},
	output: {
		assetPrefix: process.env.PUBLIC_ENVIRONMENT === 'production' ? 'https://app.betfin.io' : 'https://betfin-app-dev.web.app'
	},
	tools: {
		rspack: (config, {appendPlugins, addRules}) => {
			addRules([
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader', 'postcss-loader'],
				},
			])
			config.output!.uniqueName = 'betfinio_app';
			appendPlugins([
				TanStackRouterRspack(),
				new ModuleFederationPlugin({
					name: 'betfinio_app',
					remotes: {
						betfinio_staking: getStaking()
					},
					exposes: {
						'./TailwindCssGlobal': './src/tailwind.global.scss',
						'./BetValue': './components/ui/BetValue.tsx',
						'./DataTable': './components/ui/DataTable.tsx',
						'./root': './src/routes/__root.tsx',
						'./dialog': './components/ui/dialog.tsx',
						'./sheet': './components/ui/sheet.tsx',
						'./popover': './components/ui/popover.tsx',
						'./button': './components/ui/button.tsx',
						'./tabs': './components/ui/tabs.tsx',
						'./badge': './components/ui/badge.tsx',
						'./table': './components/ui/table.tsx',
						'./tooltip': './components/ui/tooltip.tsx',
						'./skeleton': './components/ui/skeleton.tsx',
						'./supabase': './lib/contexts/supabase',
						"./lib/api/conservative": './lib/api/conservative',
						"./lib/api/dynamic": './lib/api/dynamic',
						"./lib/api/token": './lib/api/token',
						'./lib/query/conservative': './lib/query/conservative',
						'./lib/query/dynamic': './lib/query/dynamic',
						'./lib/query/token': './lib/query/token',
						'./lib/utils': './lib/utils',
						'./locales/ru': './src/translations/ru.json',
						'./locales/en': './src/translations/en.json',
					},
					shared: {
						'react': {
							singleton: true,
							requiredVersion: dependencies['react']
						},
						'react-dom': {
							singleton: true,
							requiredVersion: dependencies['react-dom']
						},
						"@tanstack/react-router": {
							singleton: true,
							requiredVersion: dependencies['@tanstack/react-router']
						},
						"@tanstack/react-query": {
							singleton: true,
							requiredVersion: dependencies['@tanstack/react-query']
						},
						"@tanstack/react-table": {
							singleton: true,
							requiredVersion: dependencies['@tanstack/react-table']
						},
						"lucide-react": {
							singleton: true,
							requiredVersion: dependencies['lucide-react']
						},
						"@supabase/supabase-js": {
							singleton: true,
							requiredVersion: dependencies['@supabase/supabase-js']
						},
						"i18next": {
							singleton: true,
							requiredVersion: dependencies['i18next']
						},
						"react-i18next": {
							singleton: true,
							requiredVersion: dependencies['react-i18next']
						},
						"tailwindcss-animate": {
							singleton: true,
							requiredVersion: dependencies['tailwindcss-animate']
						},
						"tailwindcss": {
							singleton: true,
							requiredVersion: dependencies['tailwindcss']
						},
						"wagmi": {
							singleton: true,
							requiredVersion: dependencies['wagmi']
						},
						"@web3modal/wagmi": {
							singleton: true,
							requiredVersion: dependencies['@web3modal/wagmi']
						}
					},
				}),
			]);
		},
	},
	plugins: [pluginReact(), pluginSass()],
});
