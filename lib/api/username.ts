import {Address} from "viem";
import {Options} from "@/lib";

export const fetchUsername = async (member: Address | undefined, options: Options): Promise<string> => {
	if (!member) return ''
	const {supabase} = options
	if (!supabase) return ''
	const {data: user} = await supabase!.from('metadata').select('username').eq('member', member.toLowerCase()).single()
	return user?.username || ''
}