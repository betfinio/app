import { SupabaseClient } from '@supabase/supabase-js';
import { type FC, type PropsWithChildren, createContext, useContext } from 'react';
import type { PublicClient } from 'viem';

interface SupabaseContextProps {
	client: SupabaseClient | undefined;
	archiveClient: PublicClient | undefined;
}

const SupabaseContext = createContext<SupabaseContextProps>({
	client: undefined,
	archiveClient: undefined,
});

export const SupabaseProvider: FC<PropsWithChildren<SupabaseContextProps>> = ({ children, client, archiveClient }) => {
	return <SupabaseContext.Provider value={{ client, archiveClient }}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = () => {
	return useContext(SupabaseContext);
};
export { SupabaseClient };
