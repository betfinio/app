import {FC, PropsWithChildren, ReactNode} from "react";
import Logo from "@/components/ui/logo.tsx";
import NavGroup from "@/components/ui/NavGroup.tsx";
import {NavItemProps} from "@/components/ui/NavItem.tsx";
import {Link} from "@tanstack/react-router";

const Sidebar: FC<PropsWithChildren<{ links: NavItemProps[][] }>> = ({children, links}) => {
	return <div className={'flex flex-col items-start justify-start px-5 min-h-[100vh] SIDEBAR'}>
		<Link to={'/'} className={'h-[70px] flex items-center'}>
			<Logo size={'big'}/>
		</Link>
		{children}
		{links.map((items, index) => <NavGroup key={index} links={items}/>)}
	</div>
}

export default Sidebar;