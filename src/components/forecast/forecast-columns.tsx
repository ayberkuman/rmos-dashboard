"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import type { ForecastDataItem } from "@/lib/types/api";

export const forecastColumns: ColumnDef<ForecastDataItem>[] = [
  {
    accessorKey: "Gun Tarih",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tarih" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("Gun Tarih")}</div>;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "Oda",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Oda" />
    ),
    cell: ({ row }) => {
      const oda = row.getValue("Oda") as number;
      return <div className="text-center font-medium">{oda}</div>;
    },
  },
  {
    accessorKey: "Pax",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pax" />
    ),
    cell: ({ row }) => {
      const pax = row.getValue("Pax") as number;
      return <div className="text-center">{pax}</div>;
    },
  },
  {
    accessorKey: "Yetişkin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Yetişkin" />
    ),
    cell: ({ row }) => {
      const yetiskin = row.getValue("Yetişkin") as number;
      return <div className="text-center">{yetiskin}</div>;
    },
  },
  {
    accessorKey: "Çocuk",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Çocuk" />
    ),
    cell: ({ row }) => {
      const cocuk = row.getValue("Çocuk") as number;
      return <div className="text-center">{cocuk}</div>;
    },
  },
  {
    accessorKey: "Toplam Kişi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Toplam Kişi" />
    ),
    cell: ({ row }) => {
      const toplam = row.getValue("Toplam Kişi") as number;
      return <div className="text-center font-medium">{toplam}</div>;
    },
  },
  {
    accessorKey: "Yüzde%",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Doluluk %" />
    ),
    cell: ({ row }) => {
      const yuzde = row.getValue("Yüzde%") as number;
      const percentage = (yuzde * 100).toFixed(2);
      return (
        <div className="text-center">
          <Badge
            variant={
              yuzde > 0.8
                ? "destructive"
                : yuzde > 0.5
                ? "default"
                : "secondary"
            }
          >
            %{percentage}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "Mevcut",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mevcut" />
    ),
    cell: ({ row }) => {
      const mevcut = row.getValue("Mevcut") as number;
      return <div className="text-center">{mevcut}</div>;
    },
  },
  {
    accessorKey: "Gelen Oda",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gelen Oda" />
    ),
    cell: ({ row }) => {
      const gelen = row.getValue("Gelen Oda") as number;
      return (
        <div className="text-center text-green-600 font-medium">
          {gelen > 0 ? `+${gelen}` : gelen}
        </div>
      );
    },
  },
  {
    accessorKey: "Giden Oda",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giden Oda" />
    ),
    cell: ({ row }) => {
      const giden = row.getValue("Giden Oda") as number;
      return (
        <div className="text-center text-red-600 font-medium">
          {giden > 0 ? `-${giden}` : giden}
        </div>
      );
    },
  },
  {
    accessorKey: "Net Oda",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Net Oda" />
    ),
    cell: ({ row }) => {
      const net = row.getValue("Net Oda") as number;
      return <div className="text-center font-semibold">{net}</div>;
    },
  },
  {
    accessorKey: "Brut Tutar",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brut Tutar" />
    ),
    cell: ({ row }) => {
      const tutar = row.getValue("Brut Tutar") as number;
      return (
        <div className="text-right font-medium">
          {tutar > 0
            ? new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
              }).format(tutar)
            : "₺0"}
        </div>
      );
    },
  },
  {
    accessorKey: "Forecast",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Forecast" />
    ),
    cell: ({ row }) => {
      const forecast = row.getValue("Forecast") as number;
      return <div className="text-center">{forecast}</div>;
    },
  },
  {
    accessorKey: "His_For",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tür" />
    ),
    cell: ({ row }) => {
      const hisFor = row.getValue("His_For") as string;
      return <Badge variant="outline">{hisFor}</Badge>;
    },
  },
];
