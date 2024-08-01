import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {Link, useRouterState} from "@tanstack/react-router";
import {toast} from "react-toastify";
import {cx} from "class-variance-authority";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";

// todo: refactor

export interface NavItemProps {
	icon?: ReactNode,
	label: string,
	href: string,
	soon?: boolean,
	active?: boolean,
	children?: NavItemProps[],
	disabled?: boolean,
	className?: string,
	external?: boolean,
	minimized?: boolean
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
	minimized = false
}) => {
	const {t} = useTranslation();
	const {location: {pathname, href: url}} = useRouterState();
	
	const handleSoon = () => {
		toast.dark("Coming soon", {toastId: 'report'})
	}
	if (external) {
		return <a className={cx('flex flex-row items-center gap-5 text-white font-medium hover:text-yellow-400', className)}
		          href={href} target={'_blank'}>{icon || <div className={'w-6'}></div>} {!minimized && label}</a>
	}
	return <>
		{disabled ? (
			<div
				onClick={handleSoon}
				className={cx('flex flex-row relative items-center gap-5 w-full font-medium hover:text-yellow-400', active && 'text-yellow-400', className, 'opacity-50 cursor-not-allowed')}>
				{icon || <div className={'w-6'}></div>} {!minimized && label}
				{!minimized && soon && (
					<SoonBadge/>
				)}
			</div>
		) : (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Link className={cx('flex flex-row items-center gap-5 font-medium hover:text-yellow-400', active && 'text-yellow-400', className)} to={disabled ? '/soon' : href}>
							{icon || <div className={'w-6'}></div>} {!minimized && label}
						</Link>
					</TooltipTrigger>
					<TooltipContent side={'right'}>
						{label}
					</TooltipContent>
				</Tooltip>
			
			</TooltipProvider>
		
		)}
		
		{(active || children?.length || 0 > 0) && children?.map((item, index) => <NavItem key={index} minimized={minimized} {...item}
		                                                                                  className={cx(!minimized && 'pl-6 !gap-3')}
		                                                                                  label={t('shared.sidebar.' + item.label)}
		                                                                                  active={item.href.startsWith(location.origin) && item.href.includes(pathname)}/>)}
	</>
}

export default NavItem;

const SoonBadge = () => {
	return (
		<div className={'absolute right-0 text-[10px] bg-yellow-400 p-1 px-2 text-black rounded-lg'}>
			Soon
		</div>
	)
}