import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { CircleAlert, CircleCheck, Loader } from 'lucide-react';

export function Toaster() {
	const { toasts } = useToast();
	return (
		<ToastProvider>
			{toasts.map(({ id, title, description, variant, action, ...props }) => (
				<Toast key={id} {...props} variant={variant}>
					<div className="flex flex-row gap-4 items-center">
						{variant === 'default' && <CircleCheck className={'text-green-400 w-8 h-8'} />}
						{variant === 'destructive' && <CircleAlert className={'text-red-roulette w-8 h-8'} />}
						{variant === 'soon' && <CircleAlert className={'text-purple-box w-8 h-8'} />}
						{variant === 'loading' && <Loader className={'text-yellow-400 w-8 h-8 animate-spin'} />}

						<div>
							{title && <ToastTitle>{title}</ToastTitle>}
							{description && <ToastDescription>{description}</ToastDescription>}
						</div>
					</div>
					<div className={'!mr-6'}>{action}</div>
					<ToastClose />
				</Toast>
			))}
			<ToastViewport />
		</ToastProvider>
	);
}
