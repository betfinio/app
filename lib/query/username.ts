import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Address, WriteContractReturnType} from "viem";
import {fetchCustomUsername, fetchUsername, saveCustomUsername, saveUsername} from "../api/username";
import {useSupabase} from "@/lib/contexts/supabase";
import {useAccount, useSignMessage} from "wagmi";
import {toast} from "@/components/ui/use-toast.ts";
import {ZeroAddress} from "@betfinio/abi";
import {useTranslation} from "react-i18next";

export const useUsername = (address: Address | undefined) => {
	const {client} = useSupabase()
	return useQuery({
		queryKey: ['app', 'username', address],
		queryFn: () => fetchUsername(address, {supabase: client}),
	})
}
export const useCustomUsername = (address: Address | undefined, user: Address | undefined) => {
	const {client} = useSupabase()
	return useQuery({
		queryKey: ['app', 'username', address, user],
		queryFn: () => fetchCustomUsername(address, user, client!),
	})
}

export const useChangeUsername = () => {
	const {client} = useSupabase()
	const {address: me = ZeroAddress} = useAccount()
	const {t} = useTranslation('', {keyPrefix: 'shared.errors'})
	const queryClient = useQueryClient()
	const {signMessageAsync} = useSignMessage()
	return useMutation({
		mutationKey: ['app', 'username', 'change'],
		mutationFn: (username: string) => saveUsername(username, me, signMessageAsync, {supabase: client, queryClient}),
		onError: (e: any) => {
			console.log('error', e, e.cause, e.cause.reason)
			if (e && e.cause && e.cause.reason) {
				toast({
					title: "Failed to save username",
					description: t(e.cause.reason),
					variant: 'destructive'
				})
			} else {
				toast({
					title: t('unknown'),
					variant: 'destructive'
				})
			}
		},
		onSettled: async (data) => {
			await queryClient.invalidateQueries({queryKey: ['app', 'username']})
			if (data) {
				toast({
					title: "Username changed",
					variant: 'default'
				})
			}
		}
	})
}


export const useChangeCustomUsername = () => {
	const {client: supabase} = useSupabase()
	const {t} = useTranslation('', {keyPrefix: 'shared.errors'})
	const {signMessageAsync} = useSignMessage()
	const queryClient = useQueryClient()
	const {address: me = ZeroAddress} = useAccount()
	return useMutation<any, any, { username: string, address: Address }>({
		mutationKey: ['affiliate', 'member', 'change', 'username'],
		mutationFn: async ({username, address}) => saveCustomUsername(username, address, me, signMessageAsync, {supabase, queryClient}),
		onError: (e: any) => {
			console.log('error', e, e.cause, e.cause.reason)
			if (e && e.cause && e.cause.reason) {
				toast({
					title: "Failed to save username",
					description: t(e.cause.reason),
					variant: 'destructive'
				})
			} else {
				toast({
					title: t('unknown'),
					variant: 'destructive'
				})
			}
		},
		onSettled: async (data) => {
			await queryClient.invalidateQueries({queryKey: ['app', 'username']})
			if (data) {
				toast({
					title: "Username changed",
					variant: 'default'
				})
			}
		}
	})
}