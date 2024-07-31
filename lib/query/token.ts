import {useMutation, useQuery} from "@tanstack/react-query";
import {fetchAllowance, fetchBalance, increaseAllowance} from "@/lib/api/token";
import {TokenContract, ZeroAddress} from "@betfinio/abi";
import {Address, decodeEventLog, Log, WriteContractReturnType} from "viem";
import queryClient from "@/src/config/query.ts";
import config from "@/src/config/wagmi.ts";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import {waitForTransactionReceipt, watchContractEvent} from "viem/actions";
import {toast} from "@/components/ui/use-toast.ts";
import {getTransactionLink} from "@/lib/helpers.tsx";

export const useBalance = (address: Address | undefined) => {
	useEffect(() => {
		if (!address) return;
		const unwatch = watchContractEvent(config.getClient(), {
			abi: TokenContract.abi,
			address: import.meta.env.PUBLIC_TOKEN_ADDRESS,
			eventName: 'Transfer',
			onLogs: async (log: Log[]) => {
				for (const l of log) {
					const event = decodeEventLog({
						abi: TokenContract.abi,
						...l,
						strict: true
					})
					const {from, to} = event.args as unknown as { from: string, to: string }
					if (from.toLowerCase() === address!.toLowerCase() || to.toLowerCase() === address!.toLowerCase()) {
						await queryClient.invalidateQueries({queryKey: ['app', 'account', "balance", address?.toLowerCase()]})
						await queryClient.invalidateQueries({queryKey: ['app', 'account', 'allowance', address?.toLowerCase()]})
					}
				}
			}
		})
		return () => unwatch()
	}, [address]);
	
	return useQuery<bigint>({
		queryKey: ['app', 'account', "balance", address?.toLowerCase()],
		queryFn: () => fetchBalance(address, {config: config}),
	})
}

export const useAllowance = (address: Address | undefined) => {
	useEffect(() => {
		if (!address || address === ZeroAddress) return;
		const unwatch = watchContractEvent(config.getClient(), {
			abi: TokenContract.abi,
			address: import.meta.env.PUBLIC_TOKEN_ADDRESS,
			eventName: 'Approval',
			onLogs: async (log: Log[]) => {
				const event = decodeEventLog({
					abi: TokenContract.abi,
					...log[0],
					strict: true
				})
				const {owner} = event.args as unknown as { owner: Address }
				if (owner.toLowerCase() === address!.toLowerCase()) {
					await queryClient.invalidateQueries({queryKey: ['app', 'account', "allowance", address?.toLowerCase()]})
				}
			}
		})
		return () => unwatch()
	}, [address]);
	
	return useQuery<bigint>({
		queryKey: ['app', 'account', "allowance", address?.toLowerCase()],
		queryFn: () => fetchAllowance(address, {config})
	})
}


export const useIncreaseAllowance = () => {
	const {t} = useTranslation('translation', {keyPrefix: 'errors'})
	return useMutation<WriteContractReturnType, any, void>({
		mutationKey: ['app', 'account', 'increaseAllowance'],
		mutationFn: () => increaseAllowance({config}),
		onError: (e) => {
			console.log('error', e, e.cause, e.cause.reason)
			if (e && e.cause && e.cause.reason) {
				toast({
					title: "Failed to mint passes",
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
		onSuccess: async (data) => {
			if (data !== undefined) {
				const {id, update} = toast({
					title: "Increasing allowance",
					description: "Transaction submitted",
					variant: 'loading',
					duration: 60 * 1000
				})
				await waitForTransactionReceipt(config.getClient(), {
					hash: data
				})
				update({
					title: "Allowance was increased",
					description: "Transaction confirmed",
					variant: 'default',
					duration: 5 * 1000,
					id: id,
					action: getTransactionLink(data)
				})
			} else {
				toast({
					title: t('unknown'),
					variant: 'destructive'
				})
			}
		}
	})
}