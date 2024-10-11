import RootLayout from '@/components/blocks/RootLayout.tsx';
import { AllowanceProvider } from '@/lib/contexts/allowance.tsx';
import { SupabaseProvider } from '@/lib/contexts/supabase.tsx';
import client from '@/src/config/supabase.ts';
import instance from '@/src/i18n.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet, type RootRoute, createRootRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import type { i18n } from 'i18next';
import { type FC, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { I18nextProvider } from 'react-i18next';
import { WagmiProvider } from 'wagmi';
import queryClient from '../config/query.ts';
import config, { archiveClient } from '../config/wagmi.ts';

ReactGA.initialize(import.meta.env.PUBLIC_GTAG);

export const Root: FC<{ instance: i18n; id: string }> = ({ instance, id }) => {
	useEffect(() => {
		if (window.location.hostname.includes('cz')) {
			instance.changeLanguage('cz');
		}
	}, []);
	const isProd = import.meta.env.PUBLIC_ENVIRONMENT === 'production';
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<SupabaseProvider client={client} archiveClient={archiveClient}>
					<I18nextProvider i18n={instance}>
						<AllowanceProvider>
							{!isProd && (
								<div className={'w-full bg-red-roulette text-white overflow-hidden'}>
									<motion.div
										initial={{ x: '-300px' }}
										animate={{ x: '100%' }}
										transition={{ duration: 10, ease: 'linear', repeat: Number.POSITIVE_INFINITY }}
										className={''}
									>
										This is a test version of BETFIN
									</motion.div>
								</div>
							)}
							<RootLayout id={id}>
								<Outlet />
							</RootLayout>
						</AllowanceProvider>
					</I18nextProvider>
				</SupabaseProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};

export const Route: RootRoute = createRootRoute({
	component: () => <Root id={'app'} instance={instance} />,
});
