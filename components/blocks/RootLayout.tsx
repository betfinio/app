import {FC, PropsWithChildren, ReactNode} from "react";

interface RootLayoutProps {
	header: ReactNode;
	footer: ReactNode;
	sidebar: ReactNode;
	id: string;
}

const RootLayout: FC<PropsWithChildren<RootLayoutProps>> = ({children, footer, header, id, sidebar}) => {
	return <main className={'w-full min-h-[100vh] max-w-[1440px] mx-auto bg-primary text-white flex flex-row flex-nowrap'}>
		<section className={'hidden lg:block lg:min-w-[250px] :min-w-[300px] max-w-[250px] xl:max-w-[300px] min-h-[100vh]'}>
			{sidebar}
		</section>
		<div id={id} className={'flex flex-col flex-grow'}>
			{header}
			{children}
		</div>
		{/*<div className={'w-full'}>*/}
		{/*	{footer}*/}
		{/*</div>*/}
	</main>
}

export default RootLayout;