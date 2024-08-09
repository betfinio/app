import { SquareArrowOutUpRight } from 'lucide-react';

export function getTransactionLink(hash: string, label?: string) {
	return (
		<a
			href={`${import.meta.env.PUBLIC_ETHSCAN}/tx/${hash}`}
			target={'_blank'}
			className={'flex flex-row items-center justify-between gap-1 pr-10'}
			rel="noreferrer"
		>
			{label}
			<SquareArrowOutUpRight className={'w-4 h-4'} />
		</a>
	);
}
