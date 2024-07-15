import {createContext, FC, PropsWithChildren, useContext} from "react";
import {SupabaseClient} from "@supabase/supabase-js";

interface SupabaseContextProps {
	client: SupabaseClient | undefined
}

const SupabaseContext = createContext<SupabaseContextProps>({
	client: undefined
})


export const SupabaseProvider: FC<PropsWithChildren<SupabaseContextProps>> = ({children, client}) => {
	return <SupabaseContext.Provider value={{client}}>
		{children}
	</SupabaseContext.Provider>
}

export const useSupabase = () => {
	return useContext(SupabaseContext);
}
export {SupabaseClient};