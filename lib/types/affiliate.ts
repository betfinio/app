import {Address} from "viem";

export interface Member {
	member: string;
	inviter: string
	parent: string;
	invitees: number;
	left: string;
	right: string;
	count: {
		left: number;
		right: number;
	},
	volume: {
		left: bigint;
		right: bigint;
		member: bigint;
	},
	bets: {
		left: bigint;
		right: bigint;
		member: bigint;
	},
	matched: {
		left: bigint;
		right: bigint;
	},
	is: {
		matching: boolean,
		inviting: boolean
	},
	username: string,
	index: bigint
}

export interface TreeMember {
	member: Address;
	parent: Address;
	inviter: Address;
	left: Address | null;
	right: Address | null,
	isMatching: boolean,
	isInviting: boolean,
	volume: bigint,
	volumeLeft: bigint,
	volumeRight: bigint,
	bets: bigint,
	betsLeft: bigint,
	betsRight: bigint,
	matchedLeft: bigint,
	matchedRight: bigint,
	countLeft: bigint,
	countRight: bigint,
	count: number,
	index?: bigint
	username?: string
	
}

export interface BalanceInfo {
	total: bigint,
	claimed: bigint,
	claimable: bigint,
	claimableDaily?: bigint
}

export interface Balance {
	bets: BalanceInfo,
	staking: BalanceInfo,
	matching: BalanceInfo,
}

export interface Claim {
	timestamp: number,
	amount: bigint
	transaction: Address
}