import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {pluginSass} from '@rsbuild/plugin-sass';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';
// @ts-ignore
import {TanStackRouterRspack} from '@tanstack/router-plugin/rspack'
// @ts-ignore
import {dependencies} from "./package.json";

export default defineConfig({
	server: {
		port: 5555,
	},
	dev: {
		assetPrefix: 'http://localhost:5555',
	},
	html: {
		title: 'BetFin'
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
					exposes: {
						'./TailwindCssGlobal': './src/tailwind.global.scss',
						'./root': './src/routes/__root.tsx',
						'./dialog': './components/ui/dialog.tsx',
						'./sheet': './components/ui/sheet.tsx',
						'./popover': './components/ui/popover.tsx',
						'./button': './components/ui/button.tsx',
						'./badge': './components/ui/badge.tsx',
						'./tooltip': './components/ui/tooltip.tsx',
						'./skeleton': './components/ui/skeleton.tsx',
						'./BetValue': './components/ui/BetValue.tsx',
						'./supabase': './lib/contexts/supabase',
						"./lib/api/conservative": './lib/api/conservative',
						"./lib/api/dynamic": './lib/api/dynamic',
						"./lib/api/token": './lib/api/token',
						'./lib/query/conservative': './lib/query/conservative',
						'./lib/query/dynamic': './lib/query/dynamic',
						'./lib/utils': './lib/utils',
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
