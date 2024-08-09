import { Toaster } from '@/components/ui/toaster.tsx';
import cx from 'clsx';
import type { FC, PropsWithChildren, ReactNode } from 'react';

interface RootLayoutProps {
	header: ReactNode;
	footer: ReactNode;
	sidebar: ReactNode;
	id: string;
}

const RootLayout: FC<PropsWithChildren<RootLayoutProps>> = ({ children, footer, header, id, sidebar }) => {
	return (
		<main className={'w-full min-h-[100vh] max-w-[1440px] mx-auto bg-primary text-white flex flex-col'}>
			<div className={'flex flex-nowrap max-w-[100vw] overflow-x-hidden'}>
				<section className={'hidden lg:block lg:max-w-[250px] min-h-[100vh]'}>{sidebar}</section>
				<div className={cx('flex flex-col flex-grow max-w-[100vw] overflow-x-hidden', id)}>
					{header}
					{children}
				</div>
			</div>
			<Toaster />
			<div className={'w-full '}>{footer}</div>
		</main>
	);
};

export default RootLayout;
