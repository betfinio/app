import {createRootRoute, Link, Outlet} from '@tanstack/react-router'
import {FC} from "react";
import {I18nextProvider} from 'react-i18next';
import appInstance from "../i18n.ts";
import {games, navigation, others} from "../config/links.tsx";
import ConnectButton, {WalletBalance} from "../../components/ui/ConnectButton.tsx";
import {WagmiProvider} from "wagmi";
import {QueryClientProvider} from "@tanstack/react-query";
import config from "../config/wagmi.ts";
import queryClient from "../config/query.ts";
import Header from "@/components/blocks/Header.tsx";
import Sidebar from "@/components/blocks/Sidebar.tsx";
import RootLayout from "@/components/blocks/RootLayout.tsx";
import {SupabaseProvider} from "@/lib/contexts/supabase.tsx";
import client from "@/src/config/supabase.ts";
import "../globals.css";


export const Root: FC = () => {
	const getHeader = () => {
		return <Header sidebar={getSidebar()}><ConnectButton/></Header>
	}
	const getSidebar = () => {
		return <Sidebar links={[navigation, games, others]}>
			<WalletBalance className={'mt-2'}/>
		</Sidebar>
	}
	
	const getFooter = () => {
		return <footer className={'w-full'}></footer>
	}
	return <WagmiProvider config={config}>
		<QueryClientProvider client={queryClient}>
			<SupabaseProvider client={client}>
				<I18nextProvider i18n={appInstance}>
					<RootLayout header={getHeader()} sidebar={getSidebar()} footer={getFooter()}>
						<Outlet/>
					</RootLayout>
				</I18nextProvider>
			</SupabaseProvider>
		</QueryClientProvider>
	</WagmiProvider>
}


export const Route = createRootRoute({
	component: Root
})
