/// <reference types="@rsbuild/core/types" />
import "@tanstack/react-table";
import {RowData} from "@tanstack/react-table";

declare module "@tanstack/react-table" {
	interface ColumnMeta {
		className?: string;
		colSpan?: number;
	}
	
	interface TableMeta<TData extends RowData> {
		updateData: (rowIndex: number, columnId: string, value: unknown) => void
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
	}
}