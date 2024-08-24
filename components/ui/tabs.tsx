import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
	({ className, ...props }, ref) => (
		<TabsPrimitive.List ref={ref} className={cn('inline-flex bg-primary min-h-10 w-full flex-nowrap items-center justify-start gap-2', className)} {...props} />
	),
);
TabsList.displayName = TabsPrimitive.List.displayName;



const tabVariants = cva(
	'inline-flex items-center justify-center border  whitespace-nowrap rounded-sm  text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ',
	{
		variants: {
			variant: {
				default: 'data-[state=active]:border-yellow-400  hover:data-[state=inactive]:border-yellow-400/50 data-[state=inactive]:border-gray-800 data-[state=active]:text-white data-[state=active]:shadow-sm',
				contained: "data-[state=active]:border-yellow-400 data-[state=active]:bg-yellow-400 data-[state=inactive]:border-transparent text-primary data-[state=inactive]:text-tertiary-foreground"
			},
			size: {
				default: 'px-3 py-1.5',

			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);


interface TabTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, VariantProps<typeof tabVariants> { }
const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, TabTriggerProps>(
	({ className, variant, size, ...props }, ref) => (
		<TabsPrimitive.Trigger
			ref={ref}
			className={cn(tabVariants({ variant, size, className }))
			}
			{...props}
		/>
	),
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(
	({ className, ...props }, ref) => (
		<TabsPrimitive.Content
			ref={ref}
			className={cn(
				'mt-2 w-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
				className,
			)}
			{...props}
		/>
	),
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
