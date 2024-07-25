import * as React from "react"
import {Table as ReactTable} from "@tanstack/react-table"

import {cn} from "@/lib/utils"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react";

const Table = React.forwardRef<
	HTMLTableElement,
	React.HTMLAttributes<HTMLTableElement>
>(({className, ...props}, ref) => (
	<div className="relative w-full overflow-auto">
		<table
			ref={ref}
			className={cn("w-full caption-bottom text-sm", className)}
			{...props}
		/>
	</div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
	<thead ref={ref} className={cn("[&_tr]:border-b border-gray-800", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
	<tbody
		ref={ref}
		className={cn("[&_tr:last-child]:border-0 border-gray-800", className)}
		{...props}
	/>
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
	<tfoot
		ref={ref}
		className={cn(
			"border-t bg-muted/50 font-medium border-gray-800 [&>tr]:last:border-b-0",
			className
		)}
		{...props}
	/>
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>(({className, ...props}, ref) => (
	<tr
		ref={ref}
		className={cn(
			"border-b transition-colors border-gray-800 data-[state=selected]:bg-secondary",
			className
		)}
		{...props}
	/>
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
	HTMLTableCellElement,
	React.ThHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
	<th
		ref={ref}
		className={cn(
			"h-12 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
			className
		)}
		{...props}
	/>
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
	<td
		ref={ref}
		className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0", className)}
		{...props}
	/>
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
	HTMLTableCaptionElement,
	React.HTMLAttributes<HTMLTableCaptionElement>
>(({className, ...props}, ref) => (
	<caption
		ref={ref}
		className={cn("mt-4 text-sm text-muted-foreground", className)}
		{...props}
	/>
))
TableCaption.displayName = "TableCaption"

interface DataTablePaginationProps<TData> {
	table: ReactTable<TData>
}

function DataTablePagination<TData>({
	table,
}: DataTablePaginationProps<TData>) {
	return (
		<div className="flex items-center justify-between py-2">
			<div className="flex-1">
			</div>
			<div className="flex items-center space-x-2 lg:space-x-4">
				<div className="flex items-center space-x-2">
					<p className="text-xs font-medium">Rows per page</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value))
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={table.getState().pagination.pageSize}/>
						</SelectTrigger>
						<SelectContent side="top">
							{[5, 10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex w-[100px] items-center justify-center text-xs font-medium">
					Page {table.getState().pagination.pageIndex + 1} of{" "}
					{table.getPageCount()}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to first page</span>
						<ChevronsLeft className="h-4 w-4"/>
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeft className="h-4 w-4"/>
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to next page</span>
						<ChevronRight className="h-4 w-4"/>
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to last page</span>
						<ChevronsRight className="h-4 w-4"/>
					</Button>
				</div>
			</div>
		</div>
	)
}


export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
	DataTablePagination
}
