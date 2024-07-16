/// <reference types="@rsbuild/core/types" />
import "@tanstack/react-table";

declare module "@tanstack/react-table" {
	interface ColumnMeta {
		className?: string;
		colSpan?: number;
	}
}