import { useLocation, useRouter } from '@tanstack/react-router';
import type { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import NavItem, { type NavItemProps } from './NavItem';

const NavGroup: FC<PropsWithChildren<{ links: NavItemProps[]; minimized?: boolean }>> = ({ children, links, minimized = false }) => {
	const { t } = useTranslation();
	const location = useLocation();
	const isActive = (href: string): boolean => {
		return (window.location.origin + location.pathname).includes(href);
	};
	return (
		<>
			<div className={'border w-full border-primaryLighter my-4'} />
			<div className={'text-gray-200 flex flex-col gap-4 pt-2 w-full'}>
				{links.map((item, index) => (
					<NavItem key={index} minimized={minimized} {...item} label={t(`shared.sidebar.${item.label}`)} active={isActive(item.href)} />
				))}
			</div>
		</>
	);
};

export default NavGroup;
