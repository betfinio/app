import {SupabaseClient} from "@supabase/supabase-js";
import {QueryClient} from "@tanstack/react-query";
import {Config} from "wagmi";

export interface Options {
	supabase?: SupabaseClient,
	queryClient?: QueryClient,
	config?: Config
}


export const getStakingUrl = () => {
	switch (import.meta.env.PUBLIC_ENVIRONMENT) {
		case 'development':
			return 'https://betfin-staking-dev.web.app'
		case 'production':
			return 'https://staking.betfin.io'
		default:
			return 'http://localhost:3000'
	}
}

export const getGamesUrl = () => {
	switch (import.meta.env.PUBLIC_ENVIRONMENT) {
		case 'development':
			return 'https://betfin-games-dev.web.app'
		case 'production':
			return 'https://betfin-games.betfin.io'
		default:
			return 'http://localhost:4000'
	}
}
