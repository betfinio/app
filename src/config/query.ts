import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnReconnect: false,
			refetchOnWindowFocus: true,
			refetchOnMount: false,
			structuralSharing: false,
			throwOnError: true,
		},
	},
});

export default queryClient;
