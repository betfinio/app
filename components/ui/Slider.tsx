'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>>(
	({ className, ...props }, ref) => (
		<SliderPrimitive.Root ref={ref} className={cn('relative flex w-full touch-none select-none items-center', className)} {...props}>
			<SliderPrimitive.Track className="relative h-[2px] w-full grow overflow-hidden rounded-full bg-secondary">
				<SliderPrimitive.Range className="absolute h-full bg-yellow-500" />
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb className="block h-3 w-3 cursor-pointer rounded-full border-2 border-primary bg-yellow-500 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />

			<div className={'w-full mt-2 h-[10px] absolute left-0 top-full text-[#6A6F84] text-[10px] flex items-center justify-between'}>
				<span>0%</span>
				<span>100%</span>
			</div>
		</SliderPrimitive.Root>
	),
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
