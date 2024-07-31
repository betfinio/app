import {Address} from "viem";
import {Options} from "@/lib/types";
import {ZeroAddress} from "@betfinio/abi";
import {SupabaseClient} from "@supabase/supabase-js";
import {toast} from "@/components/ui/use-toast.ts";

export const fetchUsername = async (member: Address | undefined, options: Options): Promise<string> => {
	if (!member) return ''
	const {supabase} = options
	if (!supabase) return ''
	const {data: user} = await supabase!.from('metadata').select('username').eq('member', member.toLowerCase()).single()
	return user?.username || ''
}

export const fetchCustomUsername = async (address: Address | undefined, user: Address | undefined, supabase: SupabaseClient) => {
	if (address === ZeroAddress || !address || !user || user === ZeroAddress) {
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

export const saveUsername = async (username: string, me: Address, sign: any, options: Options) => {
	const message = "USERNAME:" + username
	const res = await sign({message: message})
	const out = await options.supabase!.functions.invoke('verifyData', {
		body: {message: message, signature: res, address: me},
		method: "POST"
	})
	if (out.error) {
		throw new Error(await out.error.context.text())
	}
	return true;
}

export const saveCustomUsername = async (username: string, address: Address, user: Address, sign: any, options: Options) => {
	const message = "USERNAME:" + username + ":" + address
	const res = await sign({message: message})
	const out = await options.supabase!.functions.invoke('saveCustomUsername', {body: {message: message, signature: res, address: user}, method: "POST"})
	console.log(out)
	if (out.error) {
		throw new Error(await out.error.context.text())
	}
	return true
}