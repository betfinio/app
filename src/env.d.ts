/// <reference types="@rsbuild/core/types" />
import '@tanstack/react-table';

declare module '@tanstack/react-table' {
	interface ColumnMeta {
		className?: string;
		colSpan?: number;
	}
}

interface IdentifyEventData {
	distinctId: string;
	email?: string;
	name?: string;
	phone?: string;
}

declare global {
	interface Window {
		lc: {
			identity?: IdentityData;
			debug?: boolean;
		};
		ethereum: any;
	}
}
