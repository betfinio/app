import type { ILanguageKeys } from '@/src/i18next';
import { useLocation } from '@tanstack/react-router';
import type { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import NavItem, { type NavItemProps } from './NavItem';

const NavGroup: FC<PropsWithChildren<{ links: NavItemProps[]; minimized?: boolean }>> = ({ links, minimized = false }) => {
	const { t } = useTranslation('shared');
	const location = useLocation();
	const isActive = (href: string): boolean => {
		return (window.location.origin + location.pathname).includes(href);
	};
	if (links.length === 0) return;
	return (
		<>
			<div className={'text-gray-200 flex flex-col gap-4 pt-2 w-full'}>
				<div className={'border w-full border-primaryLighter my-4'} />
				{links.map((item, index) => (
					<NavItem
						key={item.keyIndex}
						{...item}
						minimized={minimized}
						label={t(`sidebar.${item.label as keyof ILanguageKeys['sidebar']}`)}
						active={isActive(item.href)}
					/>
				))}
			</div>
		</>
	);
};

export default NavGroup;
