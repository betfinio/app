import {FC, PropsWithChildren} from "react";
import NavItem from "./NavItem";
import {useTranslation} from "react-i18next";

const NavGroup: FC<PropsWithChildren<{ links: any[], minimized?: boolean }>> = ({children, links, minimized = false}) => {
	const {t} = useTranslation()
	return <>
		<div className={'border w-full border-primaryLighter my-4'}></div>
		<div className={'text-gray-200 flex flex-col gap-4 pt-2'}>
			{links.map((item, index) => <NavItem key={index} minimized={minimized} {...item} label={t('shared.sidebar.' + item.label)} active={location.href === item.href}/>)}
		</div>
	</>
}

export default NavGroup;