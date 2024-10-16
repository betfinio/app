import type { PopoverContentProps, PopoverProps, PopoverTriggerProps } from '@radix-ui/react-popover';
import type { TooltipContentProps, TooltipProps, TooltipProviderProps, TooltipTriggerProps } from '@radix-ui/react-tooltip';
import { createContext, useContext, useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import {
	Tooltip as OriginalTooltip,
	TooltipContent as OriginalTooltipContent,
	TooltipProvider as OriginalTooltipProvider,
	TooltipTrigger as OriginalTooltipTrigger,
} from './tooltip';

const TouchContext = createContext<boolean>(false);

const useTouch = () => useContext(TouchContext);

export const TooltipProvider = ({ children, ...props }: TooltipProviderProps) => {
	const [isTouch, setTouch] = useState<boolean>(() => {
		if (typeof window === 'undefined') {
			return false;
		}
		return window.matchMedia('(pointer: coarse)').matches;
	});

	useEffect(() => {
		const mql = window.matchMedia('(pointer: coarse)');
		const handler = (e: MediaQueryListEvent) => setTouch(e.matches);

		mql.addEventListener('change', handler);
		return () => mql.removeEventListener('change', handler);
	}, []);

	return (
		<TouchContext.Provider value={isTouch}>
			<OriginalTooltipProvider {...props}>{children}</OriginalTooltipProvider>
		</TouchContext.Provider>
	);
};

export const Tooltip = (props: TooltipProps & PopoverProps) => {
	const isTouch = useTouch();
	const Component = isTouch ? Popover : OriginalTooltip;
	return <Component {...props} />;
};

export const TooltipTrigger = (props: TooltipTriggerProps & PopoverTriggerProps) => {
	const isTouch = useTouch();
	const Component = isTouch ? PopoverTrigger : OriginalTooltipTrigger;
	return <Component {...props} />;
};

export const TooltipContent = (props: TooltipContentProps & PopoverContentProps) => {
	const isTouch = useTouch();
	const Component = isTouch ? PopoverContent : OriginalTooltipContent;
	return <Component {...props} className={'border border-border'} />;
};
