import {useMutation, useQuery} from "@tanstack/react-query";
import {fetchAllowance, fetchBalance, increaseAllowance} from "@/lib/api/token";
import {useWatchContractEvent} from "wagmi";
import {TokenContract} from "@betfinio/abi";
import {Address, decodeEventLog, Log, WriteContractReturnType} from "viem";
import queryClient from "@/src/config/query.ts";
import config from "@/src/config/wagmi.ts";
import {useTranslation} from "react-i18next";

export const useBalance = (address: Address | undefined) => {
	useWatchContractEvent({
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
	
	return useQuery<bigint>({
		queryKey: ['app', 'account', "balance", address?.toLowerCase()],
		queryFn: () => fetchBalance(address, {config: config}),
	})
}

export const useAllowance = (address: Address | undefined) => {
	useWatchContractEvent({
		...TokenContract,
		eventName: 'Approval',
		onLogs: async (log: Log[]) => {
			const event = decodeEventLog({
				...TokenContract,
				...log[0],
				strict: true
			})
			const {owner} = event.args as unknown as { owner: Address }
			if (owner.toLowerCase() === address!.toLowerCase()) {
				await queryClient.invalidateQueries({queryKey: ['app', 'account', "allowance", address?.toLowerCase()]})
			}
		}
	})
	
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
			console.log(e, t(e.cause.reason))
		},
		onMutate: () => console.log('allowance'),
		onSuccess: (data) => {
			console.log('allowance success', data)
		},
		onSettled: () => console.log('allowance settled')
	})
}