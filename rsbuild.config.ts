import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { defineConfig } from '@rsbuild/core';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';
import { dependencies } from './package.json';

function getOutput() {
	return process.env.PUBLIC_OUTPUT_URL;
}

export default defineConfig({
	server: {
		port: 5555,
	},
	dev: {
		assetPrefix: 'http://localhost:5555/',
	},
	html: {
		title: 'BetFin App',
		favicon: './src/assets/favicon.svg',
	},
	output: {
		assetPrefix: getOutput(),
	},
	tools: {
		rspack: {
			ignoreWarnings: [/Critical dependency: the request of a dependency is an expression/],
			output: {
				uniqueName: 'betfinio_app',
			},
			plugins: [
				TanStackRouterRspack(),
				new ModuleFederationPlugin({
					name: 'betfinio_app',
					exposes: {
						'./style': './src/style.ts',
						'./BetValue': './components/ui/BetValue.tsx',
						'./DataTable': './components/ui/DataTable.tsx',
						'./root': './src/routes/__root.tsx',
						'./allowance': './lib/contexts/allowance.tsx',
						'./dialog': './components/ui/dialog.tsx',
						'./separator': './components/ui/separator.tsx',
						'./sheet': './components/ui/sheet.tsx',
						'./popover': './components/ui/popover.tsx',
						'./checkbox': './components/ui/checkbox.tsx',
						'./input': './components/ui/input.tsx',
						'./button': './components/ui/button.tsx',
						'./command': './components/ui/command.tsx',
						'./select': './components/ui/select.tsx',
						'./slider': './components/ui/Slider.tsx',
						'./tabs': './components/ui/tabs.tsx',
						'./scroll-area': './components/ui/scroll-area.tsx',
						'./dropdown-menu': './components/ui/dropdown-menu.tsx',
						'./badge': './components/ui/badge.tsx',
						'./use-toast': './components/ui/use-toast.ts',
						'./table': './components/ui/table.tsx',
						'./progress': './components/ui/progress.tsx',
						'./drawer': './components/ui/drawer.tsx',
						'./tooltip': './components/ui/tooltip.tsx',
						'./skeleton': './components/ui/skeleton.tsx',
						'./radio-group': './components/ui/radio-group.tsx',
						'./accordion': './components/ui/accordion.tsx',
						'./carousel': './components/ui/carousel.tsx',
						'./breadcrumb': './components/ui/breadcrumb.tsx',
						'./supabase': './lib/contexts/supabase',
						'./lib/api/conservative': './lib/api/conservative',
						'./lib/api/username': './lib/api/username',
						'./lib/api/dynamic': './lib/api/dynamic',
						'./lib/api/token': './lib/api/token',
						'./lib/api/pass': './lib/api/pass',
						'./helpers': './lib/helpers.tsx',
						'./lib/query/conservative': './lib/query/conservative',
						'./lib/query/dynamic': './lib/query/dynamic',
						'./lib/query/username': './lib/query/username',
						'./lib/query/shared': './lib/query/shared',
						'./lib/query/token': './lib/query/token',
						'./lib/query/pass': './lib/query/pass',
						'./lib/utils': './lib/utils',
						'./lib/types': './lib/types',
						'./lib': './lib/index',
						'./locales/ru': './src/translations/ru/shared.json',
						'./locales/en': './src/translations/en/shared.json',
						'./locales/cz': './src/translations/cz/shared.json',
						'./locales/index': './src/translations/index.ts',
					},
					shared: {
						react: {
							singleton: true,
							requiredVersion: dependencies.react,
						},
						'react-dom': {
							singleton: true,
							requiredVersion: dependencies['react-dom'],
						},
						'@tanstack/react-router': {
							singleton: true,
							requiredVersion: dependencies['@tanstack/react-router'],
						},
						'@tanstack/react-query': {
							singleton: true,
							requiredVersion: dependencies['@tanstack/react-query'],
						},
						'@tanstack/react-table': {
							singleton: true,
							requiredVersion: dependencies['@tanstack/react-table'],
						},
						'lucide-react': {
							singleton: true,
							requiredVersion: dependencies['lucide-react'],
						},
						'@supabase/supabase-js': {
							singleton: true,
							requiredVersion: dependencies['@supabase/supabase-js'],
						},
						i18next: {
							singleton: true,
							requiredVersion: dependencies.i18next,
						},
						'react-i18next': {
							singleton: true,
							requiredVersion: dependencies['react-i18next'],
						},
						'tailwindcss-animate': {
							singleton: true,
							requiredVersion: dependencies['tailwindcss-animate'],
						},
						tailwindcss: {
							singleton: true,
							requiredVersion: dependencies.tailwindcss,
						},
						wagmi: {
							singleton: true,
							requiredVersion: dependencies.wagmi,
						},
						'@web3modal/wagmi': {
							singleton: true,
							requiredVersion: dependencies['@web3modal/wagmi'],
						},
					},
				}),
			],
		},
	},
	plugins: [pluginReact(), pluginSass(), pluginNodePolyfill()],
});
