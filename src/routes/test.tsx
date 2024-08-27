import { createFileRoute, redirect } from '@tanstack/react-router';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';

export const Route = createFileRoute('/test')({
	component: TestPage,
	beforeLoad: () => {
		console.log(window.origin);
		if (window.origin.includes('betfin')) throw redirect({ to: '/' });
	},
});

function TestPage() {
	return (
		<div className={'border border-red-500 p-4 text-white'}>
			<RadioGroup defaultValue={'1'}>
				<label className={'flex flex-row items-center gap-2 rounded-xl p-3 px-4 bg-primaryLighter cursor-pointer hover:bg-primaryLight duration-100'}>
					<RadioGroupItem value={'1'} />
					Answer 1
				</label>
				<label className={'flex flex-row items-center gap-2 rounded-xl p-2 bg-primaryLighter cursor-pointer hover:bg-primaryLight duration-100'}>
					<RadioGroupItem value={'2'} />
					Answer 2
				</label>
				<label className={'flex flex-row items-center gap-2 rounded-xl p-2 bg-primaryLighter cursor-pointer hover:bg-primaryLight duration-100'}>
					<RadioGroupItem value={'3'} />
					Answer 3
				</label>
				<label className={'flex flex-row items-center gap-2 rounded-xl p-2 bg-primaryLighter cursor-pointer hover:bg-primaryLight duration-100'}>
					<RadioGroupItem value={'4'} />
					Answer 4
				</label>
			</RadioGroup>
		</div>
	);
}
