import { ZeroAddress } from '@betfinio/abi';
import type { Address } from 'viem';

export interface Member {
	member: Address;
	inviter: Address;
	parent: Address;
	invitees: number;
	left: Address;
	right: Address;
	count: {
		left: number;
		right: number;
	};
	volume: {
		left: bigint;
		right: bigint;
		member: bigint;
	};
	bets: {
		left: bigint;
		right: bigint;
		member: bigint;
	};
	matched: {
		left: bigint;
		right: bigint;
	};
	is: {
		matching: boolean;
		inviting: boolean;
	};
	username: string;
	index: bigint;
}

export interface TreeMember {
	member: Address;
	parent: Address;
	inviter: Address;
	left: Address | null;
	right: Address | null;
	isMatching: boolean;
	isInviting: boolean;
	volume: bigint;
	volumeLeft: bigint;
	volumeRight: bigint;
	bets: bigint;
	betsLeft: bigint;
	betsRight: bigint;
	matchedLeft: bigint;
	matchedRight: bigint;
	countLeft: bigint;
	countRight: bigint;
	count: number;
	index?: bigint;
	username?: string;
}

export interface BalanceInfo {
	total: bigint;
	claimed: bigint;
	claimable: bigint;
	claimableDaily?: bigint;
}

export interface Balance {
	bets: BalanceInfo;
	staking: BalanceInfo;
	matching: BalanceInfo;
}

export interface Claim {
	timestamp: number;
	amount: bigint;
	transaction: Address;
}

export const defaultTreeMember: TreeMember = {
	member: ZeroAddress,
	inviter: ZeroAddress,
	parent: ZeroAddress,
	left: ZeroAddress,
	right: ZeroAddress,
	isMatching: false,
	isInviting: false,
	volumeLeft: 0n,
	volumeRight: 0n,
	betsLeft: 0n,
	betsRight: 0n,
	matchedLeft: 0n,
	matchedRight: 0n,
	countLeft: 0n,
	countRight: 0n,
	count: 0,
	volume: 0n,
	bets: 0n,
};
