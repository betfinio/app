import RootLayout from '@/components/blocks/RootLayout.tsx';
import { AllowanceProvider } from '@/lib/contexts/allowance.tsx';
import { SupabaseProvider } from '@/lib/contexts/supabase.tsx';
import client from '@/src/config/supabase.ts';
import instance from '@/src/i18n.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute, type RootRoute } from '@tanstack/react-router';
import type { i18n } from 'i18next';
import type { FC } from 'react';
import { I18nextProvider } from 'react-i18next';
import { WagmiProvider } from 'wagmi';
import queryClient from '../config/query.ts';
import config, { archiveClient } from '../config/wagmi.ts';

export const Root: FC<{ instance: i18n; id: string }> = ({ instance, id }) => {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<SupabaseProvider client={client} archiveClient={archiveClient}>
					<I18nextProvider i18n={instance}>
						<AllowanceProvider>
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
