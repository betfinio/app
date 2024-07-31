import {Address} from "viem";
import {useSupabase} from "@/lib/contexts/supabase.tsx";
import {useQuery} from "@tanstack/react-query";
import {TreeMember} from "@/lib/types";
import {fetchInviteBettingVolume, fetchInviteStakingVolume, fetchTreeMember} from "@/lib/api/affiliate.ts";
import {useConfig} from "wagmi";

export const useTreeMember = (address: Address) => {
	const {client} = useSupabase();
	return useQuery<TreeMember>({
		queryKey: ['affiliate', 'members', 'tree', 'member', address],
		queryFn: () => fetchTreeMember(address, {supabase: client}),
		refetchOnMount: false,
		refetchOnWindowFocus: false
	})
}

export const useInviteStakingVolume = (member: Address) => {
	const config = useConfig();
	return useQuery<bigint>({
		queryKey: ['affiliate', 'inviteStakingVolume', member],
		queryFn: () => fetchInviteStakingVolume(member, config)
	})
}

export const useInviteBettingVolume = (member: Address) => {
	const config = useConfig();
	return useQuery<bigint>({
		queryKey: ['affiliate', 'inviteBettingVolume', member],
		queryFn: () => fetchInviteBettingVolume(member, config)
	})
}