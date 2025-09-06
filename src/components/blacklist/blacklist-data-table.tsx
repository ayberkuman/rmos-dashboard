"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BlacklistItem } from "@/lib/types/api";

interface BlacklistDataTableProps {
  data: BlacklistItem[];
  onEdit: (item: BlacklistItem) => void;
}

export function BlacklistDataTable({ data, onEdit }: BlacklistDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<BlacklistItem>[] = [
    {
      accessorKey: "Id",
      header: "ID",
      cell: ({ row }) => <div className="font-mono">{row.getValue("Id")}</div>,
    },
    {
      accessorKey: "Adi",
      header: "Adı",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("Adi")}</div>
      ),
    },
    {
      accessorKey: "Soy",
      header: "Soyadı",
      cell: ({ row }) => <div>{row.getValue("Soy")}</div>,
    },
    {
      accessorKey: "Tcno",
      header: "TC No",
      cell: ({ row }) => {
        const tcno = row.getValue("Tcno") as string | null;
        return <div className="font-mono text-sm">{tcno || "-"}</div>;
      },
    },
    {
      accessorKey: "Kimlik_no",
      header: "Kimlik No",
      cell: ({ row }) => {
        const kimlikNo = row.getValue("Kimlik_no") as string | null;
        return <div className="font-mono text-sm">{kimlikNo || "-"}</div>;
      },
    },
    {
      accessorKey: "ULke Adı",
      header: "Ülke",
      cell: ({ row }) => {
        const ulke = row.getValue("ULke Adı") as string | null;
        return <div>{ulke || "-"}</div>;
      },
    },
    {
      accessorKey: "Aciklama",
      header: "Açıklama",
      cell: ({ row }) => (
        <div
          className="max-w-[200px] truncate"
          title={row.getValue("Aciklama")}
        >
          {row.getValue("Aciklama")}
        </div>
      ),
    },
    {
      id: "actions",
      header: "İşlemler",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(item)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Düzenle</span>
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {data.length} kayıt gösteriliyor
          </span>
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Veri bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
