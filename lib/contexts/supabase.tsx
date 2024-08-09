import { SupabaseClient } from '@supabase/supabase-js';
import { type FC, type PropsWithChildren, createContext, useContext } from 'react';

interface SupabaseContextProps {
	client: SupabaseClient | undefined;
}

const SupabaseContext = createContext<SupabaseContextProps>({
	client: undefined,
});

export const SupabaseProvider: FC<PropsWithChildren<SupabaseContextProps>> = ({ children, client }) => {
	return <SupabaseContext.Provider value={{ client }}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = () => {
	return useContext(SupabaseContext);
};
export { SupabaseClient };
