import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';
// @ts-ignore
import {TanStackRouterRspack} from '@tanstack/router-plugin/rspack'

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
		assetPrefix: process.env.PUBLIC_ENVIRONMENT === 'production' ? 'https://betfin-app.web.app' : 'https://betfin-app-dev.web.app'
	},
	tools: {
		rspack: (config, {appendPlugins, addRules}) => {
			config.output!.uniqueName = 'betfinio_app';
			appendPlugins([
				TanStackRouterRspack(),
				new ModuleFederationPlugin({
					name: 'betfinio_app',
					exposes: {
						'./root': './src/routes/__root.tsx',
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
	plugins: [pluginReact()],
});
