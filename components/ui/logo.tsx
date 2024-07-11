import {FC} from "react";
import {BetLogo} from "@betfinio/ui/dist/icons";
import {cx} from "class-variance-authority";
import BigLogo from "@/components/icons/BigLogo.tsx";

const Logo: FC<{ size: 'small' | 'big', className?: string }> = ({size, className,}) => {
	if (size === 'small') {
		return <BetLogo className={cx(className)}/>
	} else {
		return <BigLogo className={cx(className)} />
	}
}

export default Logo;