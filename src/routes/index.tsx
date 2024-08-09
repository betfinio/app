import MainBlock from '@/components/blocks/MainBlock';
import Tables from '@/components/blocks/Tables';
import { createFileRoute } from '@tanstack/react-router';

const Index = () => {
	return (
		<div className={'w-full h-full p-2 md:p-3 lg:p-4 gap-2 flex flex-col lg:gap-4'}>
			<MainBlock variant={'conservative'} />
			<MainBlock variant={'dynamic'} />
			<Tables />
		</div>
	);
};

export const Route = createFileRoute('/')({
	component: Index,
});
