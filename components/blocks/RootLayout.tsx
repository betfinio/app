import { Toaster } from '@/components/ui/toaster.tsx';
import { games, navigation, others } from '@/src/config/links';
import cx from 'clsx';
import { type FC, type PropsWithChildren, useState } from 'react';
import ConnectButton, { WalletBalance } from '../ui/ConnectButton';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

interface RootLayoutProps {
	id: string;
}

const RootLayout: FC<PropsWithChildren<RootLayoutProps>> = ({ children, id }) => {
	const [minimized, setMinimized] = useState<boolean>(localStorage.getItem('sidebar-minimized') === 'true');
	const handleMinimize = (minimize: boolean | ((prev: boolean) => boolean)) => {
		setMinimized((prev) => {
			const newMinimize = typeof minimize === 'function' ? minimize(prev) : minimize;

			localStorage.setItem('sidebar-minimized', newMinimize ? 'true' : 'false');

			return newMinimize;
		});
	};
	const getSidebar = (minimized?: boolean) => {
		return (
			<Sidebar links={[navigation, games, others]} minimized={minimized || false} toggleMinimized={handleMinimize}>
				<WalletBalance className={'mt-2'} />
			</Sidebar>
		);
	};
	return (
		<main className={'w-full min-h-[100vh] max-w-[1440px] mx-auto bg-primary text-white flex'}>
			{minimized && <div className="hidden lg:block ">{getSidebar(minimized)}</div>}
			<div className="flex flex-col w-full">
				<div className={'flex flex-nowrap max-w-[100vw]  min-h-[100vh] overflow-x-hidden '}>
					{!minimized && <section className={'hidden lg:block lg:max-w-[250px] min-h-[100vh] mb-10'}>{getSidebar(minimized)}</section>}
					<div className={cx('flex flex-col flex-grow max-w-[100vw] overflow-x-hidden', id)}>
						<Header sidebar={getSidebar(false)}>
							<ConnectButton />
						</Header>
						{children}
					</div>
				</div>
				<Toaster />
				<div className={'w-full mt-auto'}>
					<Footer />
				</div>
			</div>
		</main>
	);
};

export default RootLayout;
