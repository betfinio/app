import { type ColumnDef, type TableMeta, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';

import { DataTablePagination, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { InitialTableState } from '@tanstack/react-table';
import cx from 'clsx';
import { Loader } from 'lucide-react';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
	meta?: TableMeta<TData>;
	state?: InitialTableState;
	onRowClick?: (row: TData) => void;
	loaderClassName: string | undefined;
	noResultsClassName: string | undefined;
}

export function DataTable<TData, TValue>({ columns, data, isLoading = false, meta, state = {}, onRowClick,loaderClassName,noResultsClassName }: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		meta: meta,
		initialState: {
			pagination: {
				pageSize: 5,
				pageIndex: 0,
			},
			...state,
		},
	});

	return (
		<div>
			<Table className="rounded-xl border border-gray-800 w-full">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id} className={header.column.columnDef.meta?.className}>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{isLoading ? (
						<TableRow>
							<TableCell colSpan={columns.length} className={cx("h-[200px]",loaderClassName)}>
								<div className={'flex items-center justify-center'}>
									<Loader className={'animate-spin'} />
								</div>
							</TableCell>
						</TableRow>
					) : table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow className={'cursor-pointer'} key={row.id} data-state={row.getIsSelected() && 'selected'} onClick={() => onRowClick?.(row.original)}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className={cx(cell.column.columnDef.meta?.className)}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length}  className={cx("h-24 text-center",noResultsClassName)}>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<DataTablePagination table={table} />
		</div>
	);
}
