import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ExpandedState,
  type Row,
} from '@tanstack/react-table'
import { useState } from 'react'
import { ChevronDown, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Skeleton } from './Skeleton'

interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T, unknown>[]
  loading?: boolean
  emptyMessage?: string
  onRowClick?: (row: T) => void
  selectedRowId?: string
  getRowId?: (row: T) => string
  getSubRows?: (row: T) => T[] | undefined
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No data found.',
  onRowClick,
  selectedRowId,
  getRowId,
  getSubRows,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const table = useReactTable({
    data,
    columns,
    state: { sorting, expanded },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowId: getRowId as ((row: T) => string) | undefined,
    getSubRows,
  })

  if (loading) {
    return (
      <div className="flex flex-col">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 h-8 px-4 border-b border-border-subtle">
            {Array.from({ length: columns.length }).map((_, j) => (
              <Skeleton key={j} className="h-3.5 flex-1" />
            ))}
          </div>
        ))}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-text-muted text-[13px]">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="w-full overflow-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="border-b border-border-default">
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    'h-9 px-4 text-left font-medium text-text-secondary text-[12px] uppercase tracking-wider',
                    header.column.getCanSort() && 'cursor-pointer select-none hover:text-text-primary'
                  )}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === 'asc' && <ArrowUp size={12} />}
                    {header.column.getIsSorted() === 'desc' && <ArrowDown size={12} />}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              onRowClick={onRowClick}
              isSelected={selectedRowId != null && getRowId?.(row.original) === selectedRowId}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TableRow<T>({
  row,
  onRowClick,
  isSelected,
}: {
  row: Row<T>
  onRowClick?: (row: T) => void
  isSelected: boolean
}) {
  return (
    <tr
      className={cn(
        'h-8 border-b border-border-subtle transition-colors',
        onRowClick && 'cursor-pointer',
        isSelected ? 'bg-active' : 'hover:bg-hover'
      )}
      onClick={() => onRowClick?.(row.original)}
    >
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="px-4 text-text-primary" style={{ paddingLeft: cell.column.id === row.getVisibleCells()[0]?.column.id ? `${row.depth * 24 + 16}px` : undefined }}>
          <div className="flex items-center gap-1">
            {cell.column.id === row.getVisibleCells()[0]?.column.id && row.getCanExpand() && (
              <button
                onClick={(e) => { e.stopPropagation(); row.toggleExpanded() }}
                className="p-0.5 text-text-muted hover:text-text-primary"
              >
                {row.getIsExpanded() ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
            )}
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        </td>
      ))}
    </tr>
  )
}
