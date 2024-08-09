import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import { Link, useRouterState } from '@tanstack/react-router';
import { cx } from 'class-variance-authority';
import { DateTime } from 'luxon';
import { type FC, type ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

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
	const { t } = useTranslation();
	const {
		location: { pathname, href: url },
	} = useRouterState();

	const handleSoon = () => {
		toast.dark('Coming soon', { toastId: 'report' });
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
					{!minimized && soon && <SoonBadge />}
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

			{(active || children?.length) &&
				children?.map((item, index) => (
					<NavItem
						key={index + item.href}
						minimized={minimized}
						{...item}
						className={cx(!minimized && 'pl-6 !gap-3')}
						label={t(`shared.sidebar.${item.label}`)}
						active={isActive(item.href)}
					/>
				))}
		</>
	);
};

export default NavItem;

const SoonBadge = () => {
	const deployTimestamp = 1723233600 + 60 * 60 * 2; // Unix timestamp in seconds
	const deploy = DateTime.fromSeconds(deployTimestamp);

	const [diff, setDiff] = useState(deploy.diffNow(['days', 'hours', 'minutes', 'seconds']));

	useEffect(() => {
		const i = setInterval(() => {
			setDiff(deploy.diffNow(['days', 'hours', 'minutes', 'seconds']));
		}, 1000);
		return () => clearInterval(i);
	}, []);
	return (
		<div className={'absolute right-0 text-[10px] bg-yellow-400 p-1 px-2 text-black rounded-lg'}>
			{(diff.days > 0 ? `${diff.days}d ` : '') + (diff.hours > 0 ? `${diff.hours}h ` : '') + (diff.minutes > 0 ? `${Math.floor(diff.minutes)}m ` : '')}
		</div>
	);
};
