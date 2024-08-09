import MemberProfile from '@/components/blocks/MemberProfile.tsx';
import Logo from '@/components/ui/logo.tsx';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet.tsx';
import { Menu } from '@betfinio/ui/dist/icons';
import { Link } from '@tanstack/react-router';
import type { FC, PropsWithChildren, ReactNode } from 'react';

const Header: FC<PropsWithChildren<{ sidebar: ReactNode }>> = ({ children, sidebar }) => {
	return (
		<header style={{ minHeight: '70px' }} className={'flex flex-row items-center justify-between lg:justify-end px-4 border-b border-gray-800'}>
			<Link to={'/'}>
				<Logo className={'lg:hidden'} size={'small'} />
			</Link>
			{children}
			<Sheet>
				<SheetTrigger className={'lg:hidden'}>
					<Menu className={'text-white'} />
				</SheetTrigger>
				<SheetContent className={'dark text-white !max-w-[250px] pb-20 overflow-y-auto overflow-x-hidden'}>
					<SheetTitle />
					<SheetDescription />
					{sidebar}
				</SheetContent>
			</Sheet>
			<MemberProfile />
		</header>
	);
};

export default Header;
