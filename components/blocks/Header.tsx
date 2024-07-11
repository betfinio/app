import {FC, PropsWithChildren, ReactNode} from "react";
import Logo from "@/components/ui/logo.tsx";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Menu} from "@betfinio/ui/dist/icons";
import {Link} from "@tanstack/react-router";

const Header: FC<PropsWithChildren<{ sidebar: ReactNode }>> = ({children, sidebar}) => {
	return <header className={'h-[70px] flex flex-row items-center justify-between lg:justify-end px-4 border-b border-gray-800'}>
		<Link to={'/'}>
			<Logo className={'md:hidden'} size={'small'}/>
			<Logo className={'hidden md:block lg:hidden h-[30px]'} size={'big'}/>
		</Link>
		{children}
		<Sheet>
			<SheetTrigger className={'lg:hidden'}><Menu className={'text-white'}/></SheetTrigger>
			<SheetContent className={'dark text-white'}>
				<SheetTitle/>
				<SheetDescription/>
				{sidebar}
			</SheetContent>
		</Sheet>
	</header>
}

export default Header;