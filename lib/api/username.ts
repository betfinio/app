import type { Options } from '@/lib/types';
import logger from '@/src/config/logger';
import { ZeroAddress } from '@betfinio/abi';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Address } from 'viem';
import type { UseSignMessageReturnType } from 'wagmi/src/hooks/useSignMessage.ts';

export const fetchUsername = async (member: Address | undefined, options: Options): Promise<string> => {
	logger.start('fetchUsername', member);
	if (!member) return '';
	const { supabase } = options;
	if (!supabase) return '';
	const { data: user } = await supabase.from('metadata').select('username').eq('member', member.toLowerCase()).single();
	logger.success('fetchUsername', user?.username);
	return user?.username || '';
};

export const fetchCustomUsername = async (address: Address | undefined, user: Address | undefined, supabase: SupabaseClient | undefined) => {
	logger.start('fetchCustomUsername:', address, user);
	if (address === ZeroAddress || !address || !user || user === ZeroAddress || !supabase) {
		return '';
	}
	const data = await supabase.from('custom_username').select('username').eq('member', address.toLowerCase()).eq('user', user.toLowerCase()).limit(1);
	let username = '';
	if (data.data && data.data.length > 0) {
		username = data.data[0].username;
	}
	logger.success('fetchCustomUsername:', username);
	return username;
};

export const saveUsername = async (username: string, me: Address, sign: UseSignMessageReturnType, options: Options) => {
	logger.start('saveUsername:', username, me);
	const message = `USERNAME:${username}`;
	const res = await sign({ message: message });
	const out = await options.supabase?.functions.invoke('verifyData', {
		body: { message: message, signature: res, address: me },
		method: 'POST',
	});
	if (out?.error) {
		throw new Error(await out.error.context.text());
	}
	logger.success('saveUsername:', true);
	return true;
};

export const saveCustomUsername = async (username: string, address: Address, user: Address, sign: UseSignMessageReturnType, options: Options) => {
	logger.start('saveCustomUsername', username, address, user);
	const message = `USERNAME:${username}:${address}`;
	const res = await sign({ message: message });
	const out = await options.supabase?.functions.invoke('saveCustomUsername', {
		body: { message: message, signature: res, address: user },
		method: 'POST',
	});
	if (out?.error) {
		throw new Error(await out.error.context.text());
	}
	logger.success('saveCustomUsername', true);
	return true;
};
