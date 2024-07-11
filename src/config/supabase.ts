import {createClient} from "@supabase/supabase-js";

const client = createClient(
	import.meta.env.PUBLIC_SUPABASE_URL,
	import.meta.env.PUBLIC_SUPABASE_ANON_KEY
)

export default client;