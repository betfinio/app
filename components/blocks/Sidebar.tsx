import {FC, PropsWithChildren, ReactNode, useState} from "react";
import Logo from "@/components/ui/logo.tsx";
import NavGroup from "@/components/ui/NavGroup.tsx";
import {NavItemProps} from "@/components/ui/NavItem.tsx";
import {getAppUrl} from "@/src/config/links.tsx";
import cx from "clsx";
import {PanelLeftClose, PanelRightClose} from "lucide-react";

const Sidebar: FC<PropsWithChildren<{ links: NavItemProps[][] }>> = ({children, links}) => {
	const [minimized, setMinimized] = useState(false);
	const toggleSidebar = () => {
		setMinimized(p => !p)
	}
	return <>
		<div className={cx('flex flex-col px-5 min-h-[100vh]',
			minimized ? 'w-[70px] fixed top-0 left-0  border border-gray-800 bg-primaryLighter items-center justify-start' : 'w-[250px] SIDEBAR items-start justify-start')}>
			<div className={cx('flex  justify-between  items-center  cursor-pointer w-full', minimized ? 'flex-col h-[100px] mt-6 ' : 'flex-row h-[70px] mt-2')}>
				<a href={getAppUrl()} className={'flex items-center'}>
					<Logo size={minimized ? 'small' : 'big'}/>
				</a>
				<div className={'hidden lg:block'}>
					{minimized ? <PanelRightClose className={'w-6 h-6 hover:text-yellow-400'} onClick={toggleSidebar}/> :
						<PanelLeftClose className={'w-6 h-6 hover:text-yellow-400'} onClick={toggleSidebar}/>}
				</div>
			</div>
			{!minimized && children}
			{links.map((items, index) => <NavGroup key={index} links={items} minimized={minimized}/>)}
		</div>
		{minimized && <div className={'w-[70px] h-[100vh]'}/>}
	</>
	
}

export default Sidebar;