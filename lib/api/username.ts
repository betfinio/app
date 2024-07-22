import {Address} from "viem";
import {Options} from "@/lib/types";
import {ZeroAddress} from "@betfinio/abi";
import {SupabaseClient} from "@supabase/supabase-js";

export const fetchUsername = async (member: Address | undefined, options: Options): Promise<string> => {
	if (!member) return ''
	const {supabase} = options
	if (!supabase) return ''
	const {data: user} = await supabase!.from('metadata').select('username').eq('member', member.toLowerCase()).single()
	return user?.username || ''
}

export const fetchCustomUsername = async (address: Address, user: Address, supabase: SupabaseClient) => {
	if (address === ZeroAddress) {
		return ""
	}
	const data = await supabase
		.from("custom_username")
		.select("username")
		.eq("member", address.toLowerCase())
		.eq("user", user.toLowerCase())
		.limit(1)
	if (!data.data) return ""
	if (data.data && data.data.length === 0) return ""
	return data.data[0].username
}