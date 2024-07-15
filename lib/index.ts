import {SupabaseClient} from "@supabase/supabase-js";
import {QueryClient} from "@tanstack/react-query";
import {Config} from "wagmi";

export interface Options {
	supabase?: SupabaseClient,
	queryClient?: QueryClient,
	config?: Config
}
