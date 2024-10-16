import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';
import { useMediaQuery } from 'react-responsive';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/lib/utils';
import type { PopoverContentProps, PopoverProps, PopoverTriggerProps } from '@radix-ui/react-popover';
import type { TooltipContentProps, TooltipProps, TooltipTriggerProps } from '@radix-ui/react-tooltip';

const TooltipProvider = TooltipPrimitive.Provider;

const OriginalTooltip = TooltipPrimitive.Root;

const OriginalTooltipTrigger = TooltipPrimitive.Trigger;

const OriginalTooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
	<TooltipPrimitive.Portal>
		<TooltipPrimitive.Content
			ref={ref}
			sideOffset={sideOffset}
			className={cn(
				'z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				className,
			)}
			{...props}
		/>
	</TooltipPrimitive.Portal>
));
OriginalTooltipContent.displayName = TooltipPrimitive.Content.displayName;

const Tooltip = (props: TooltipProps & PopoverProps) => {
	const isMobile = useMediaQuery({
		query: '(pointer: coarse)',
	});
	const Component = isMobile ? Popover : OriginalTooltip;
	return <Component {...props} />;
};

const TooltipTrigger = (props: TooltipTriggerProps & PopoverTriggerProps) => {
	const isMobile = useMediaQuery({
		query: '(pointer: coarse)',
	});
	const Component = isMobile ? PopoverTrigger : OriginalTooltipTrigger;
	return <Component {...props} />;
};

const TooltipContent = (props: TooltipContentProps & PopoverContentProps) => {
	const isMobile = useMediaQuery({
		query: '(pointer: coarse)',
	});
	const Component = isMobile ? PopoverContent : OriginalTooltipContent;
	return <Component {...props} className={`${props.className} border border-border z-50`} />;
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
