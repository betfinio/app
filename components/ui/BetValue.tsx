import {FC} from 'react';
import millify from 'millify';
import cx from "clsx";
import {TooltipProvider, Tooltip, TooltipTrigger, TooltipContent,} from "@/components/ui/tooltip.tsx";
import {Bet} from "@betfinio/ui/dist/icons";
import {valueToNumber} from "@betfinio/abi";


interface BetValueProps {
	value: number | bigint;
	tooltipId?: string;
	withIcon?: boolean;
	precision?: number;
	place?: 'top' | 'bottom' | 'left' | 'right';
	prefix?: string;
	postfix?: string;
	iconClassName?: string;
	className?: string;
}

export const BetValue: FC<BetValueProps> = ({
	value,
	prefix = "",
	place = 'top',
	precision = 2,
	withIcon = false,
	iconClassName = '',
	postfix = " BET",
	className
}) => {
	const amount: number = typeof value === 'bigint' ? valueToNumber(value) : value;
	return (
		<TooltipProvider delayDuration={300}>
			<Tooltip>
				<TooltipTrigger asChild>
					<span className={cx(className, 'flex flex-row items-center cursor-pointer justify-start w-fit gap-1')}>
						{millify(amount, {precision: precision})}
						{withIcon && <Bet className={cx('w-4 h-4 stroke-0', iconClassName)}/>}
					</span>
				</TooltipTrigger>
				<TooltipContent side={place}>
					{prefix} {amount.toFixed(2)} {postfix}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
