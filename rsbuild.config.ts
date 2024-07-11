import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';
import {TanStackRouterRspack} from '@tanstack/router-plugin/rspack'

export default defineConfig({
	server: {
		port: 5555,
	},
	html: {
		title: 'BetFin'
	},
	tools: {
		rspack: (config, {appendPlugins}) => {
			appendPlugins([
				TanStackRouterRspack(),
				new ModuleFederationPlugin({
					name: 'betfinio_app',
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
							requiredVersion: '^1.44.0'
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
						}
					},
				}),
			]);
		},
	},
	plugins: [pluginReact()],
});
