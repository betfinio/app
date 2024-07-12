import {Address} from "viem";
import {Options} from "@/lib";
import {readContract} from "viem/actions";
import {PassContract} from "@betfinio/abi";

export const isMember = async (address: Address | undefined, options: Options): Promise<boolean> => {
	if (!options.config || !address) return false;
	return (await readContract(options.config.getClient(), {
		abi: PassContract.abi,
		address: import.meta.env.PUBLIC_PASS_ADDRESS,
		functionName: 'balanceOf',
		args: [address]
	}) as bigint) > 0n
}