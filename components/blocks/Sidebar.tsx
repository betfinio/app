import NavGroup from '@/components/ui/NavGroup.tsx';
import NavItem, { type NavItemProps } from '@/components/ui/NavItem.tsx';
import Logo from '@/components/ui/logo.tsx';
import { getAppUrl } from '@/lib';
import Support from '@betfinio/ui/dist/icons/Support';
import cx from 'clsx';
import { PanelLeftClose, PanelRightClose } from 'lucide-react';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

interface ISidebarProps extends PropsWithChildren {
	links: NavItemProps[][];
	minimized: boolean;
	toggleMinimized: Dispatch<SetStateAction<boolean>>;
}
const Sidebar: FC<ISidebarProps> = ({ children, links, minimized, toggleMinimized }) => {
	const { t } = useTranslation('', { keyPrefix: 'shared.sidebar' });

	const toggleSidebar = () => {
		toggleMinimized((p) => !p);
	};
	const handleSupport = () => {
		document.getElementById('live-chat-ai-button')?.click();
	};
	return (
		<>
			<div
				className={cx(
					'flex flex-col px-5 min-h-[100vh]',
					minimized
						? 'w-[70px] fixed top-0 left-0  border border-gray-800 bg-primaryLighter items-center justify-start'
						: 'w-[250px] SIDEBAR items-start justify-start',
				)}
			>
				<div className={cx('flex  justify-between  items-center  cursor-pointer w-full', minimized ? 'flex-col h-[100px] mt-6 ' : 'flex-row h-[70px] mt-2')}>
					<a href={getAppUrl()} className={'flex items-center'}>
						<Logo size={minimized ? 'small' : 'big'} />
					</a>
					<div className={'hidden lg:block'}>
						{minimized ? (
							<PanelRightClose className={'w-6 h-6 hover:text-yellow-400'} onClick={toggleSidebar} />
						) : (
							<PanelLeftClose className={'w-6 h-6 hover:text-yellow-400'} onClick={toggleSidebar} />
						)}
					</div>
				</div>
				{!minimized && children}
				{links.map((items, index) => (
					<NavGroup key={index} links={items} minimized={minimized} />
				))}
				<NavItem
					minimized={minimized}
					label={t('support')}
					href={''}
					icon={<Support className={'w-6 h-6'} />}
					className={'py-3'}
					disabled={false}
					onClick={handleSupport}
				/>
			</div>
			{minimized && <div className={'w-[70px] mr-4 h-[100vh]'} />}
		</>
	);
};

export default Sidebar;
