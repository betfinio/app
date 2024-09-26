import { Badge } from '@/components/ui/badge.tsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import type { ILanguageKeys } from '@/src/i18next';
import { Link, useRouterState } from '@tanstack/react-router';
import { cx } from 'class-variance-authority';
import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from './use-toast';

// todo: refactor

export interface NavItemProps {
	icon?: ReactNode;
	label: string;
	href: string;
	soon?: boolean;
	active?: boolean;
	children?: NavItemProps[];
	disabled?: boolean;
	className?: string;
	external?: boolean;
	minimized?: boolean;
	onClick?: () => void;
}

const NavItem: FC<NavItemProps> = ({
	icon,
	label,
	href,
	children,
	active = false,
	soon = false,
	className = '',
	external = false,
	disabled = !external,
	minimized = false,
	onClick,
}) => {
	const { t } = useTranslation('shared');
	const {
		location: { pathname, href: url },
	} = useRouterState();
	const handleSoon = () => {
		toast({ title: 'Coming soon' });
	};
	if (external) {
		return (
			<a
				className={cx('flex flex-row items-center gap-5 text-white font-medium hover:text-yellow-400', className)}
				href={href}
				target={'_blank'}
				rel="noreferrer"
			>
				{icon || <div className={'w-6'} />} {!minimized && label}
			</a>
		);
	}

	const isActive = (href: string): boolean => {
		return (window.location.origin + pathname).includes(href);
	};
	console.log(href, active, children);

	return (
		<>
			{disabled ? (
				<div
					onClick={handleSoon}
					className={cx(
						'flex flex-row relative items-center gap-5 w-full font-medium hover:text-yellow-400',
						active && 'text-yellow-400',
						className,
						'opacity-50 cursor-not-allowed',
					)}
				>
					{icon || <div className={'w-6'} />} {!minimized && label}
					{!minimized && soon && <Badge>Soon</Badge>}
				</div>
			) : (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Link
								onClick={onClick}
								className={cx('flex flex-row items-center gap-5 font-medium hover:text-yellow-400', active && 'text-yellow-400', className)}
								to={disabled ? '/soon' : href}
							>
								{icon || <div className={'w-6'} />} {!minimized && label}
							</Link>
						</TooltipTrigger>
						<TooltipContent side={'right'}>{label}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}

			{active &&
				children?.map((item, index) => (
					<NavItem
						key={index + item.href}
						minimized={minimized}
						{...item}
						className={cx(!minimized && 'pl-6 !gap-3')}
						label={t(`sidebar.${item.label as keyof ILanguageKeys['sidebar']}`)}
						active={isActive(item.href)}
					/>
				))}
		</>
	);
};

export default NavItem;
