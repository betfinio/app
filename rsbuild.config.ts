import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';
// @ts-ignore
import {TanStackRouterRspack} from '@tanstack/router-plugin/rspack'

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
							requiredVersion: '^18.3.1'
						},
						'react-dom': {
							singleton: true,
							requiredVersion: '^18.3.1'
						},
						"@tanstack/react-router": {
							singleton: true,
							requiredVersion: '^1.44.2'
						},
						"lucide-react": {
							singleton: true,
							requiredVersion: '^0.407.0'
						},
						"i18next": {
							singleton: true,
							requiredVersion: '^23.11.5'
						},
						"react-i18next": {
							singleton: true,
							requiredVersion: '^14.1.2'
						},
						"tailwindcss-animate": {
							singleton: true,
							requiredVersion: '^1.0.7'
						},
						"tailwindcss": {
							singleton: true,
							requiredVersion: '^3.4.4'
						},
						"@web3modal/wagmi": {
							singleton: true,
							requiredVersion: '^5.0.6'
						}
					},
				}),
			]);
		},
	},
	plugins: [pluginReact()],
});
