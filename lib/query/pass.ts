import {Address} from "viem";
import {useQuery} from "@tanstack/react-query";
import {isMember} from "@/lib/api/pass.ts";
import config from "@/src/config/wagmi"

export const useIsMember = (address: Address| undefined ) => {
	return useQuery<boolean>({
		queryKey: ['isMember', address],
		queryFn: () => isMember(address, {config})
	})
}