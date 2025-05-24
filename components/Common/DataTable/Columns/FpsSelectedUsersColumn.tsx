"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./CustomTableColumns/DataTableColumnHeader";
import DataTableRowMenu from "./CustomTableColumns/DataTableRowMenu";
import DataTableHeaderCheckBox from "./CustomTableColumns/DataTableHeaderCheckBox";
import DataTableContentCheckBox from "./CustomTableColumns/DataTableContentCheckBox";
import IconAndNameColumn from "./CustomTableColumns/IconAndNameColumn";
import ScannedQrColumn from "./CustomTableColumns/ScannedQrColumn";
import EmailColumn from "./CustomTableColumns/EmailColumn";
export type FpsSelectedUsersColumn = {
  id: string;
  scanStatus: "notScanned" | "scanned";
  image?: string;
  firstName: string;
  lastName: string;
  email: string;
};

export const columns = (
  t: (key: string) => string
): ColumnDef<FpsSelectedUsersColumn>[] => [
  {
    accessorKey: "select",
    id: "select",
    header: ({ table }) => (
      <div className="w-4">
        <DataTableHeaderCheckBox />
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-4">
        <DataTableContentCheckBox row={row} />
      </div>
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <div className="min-w-[120px]">
        <DataTableColumnHeader
          className="pl-[70px]"
          column={column}
          title={t("columns.name")}
          options={{ hide: true }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-[120px]">
        <IconAndNameColumn row={row} className="w-10 h-10" />
      </div>
    ),
  },
  {
    accessorKey: "scanStatus",
    header: ({ column }) => (
      <div className="min-w-[100px]">
        <DataTableColumnHeader
          column={column}
          title={t("columns.scanStatus")}
          options={{ up: true, down: true, hide: true }}
          // className="justify-center"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-[100px]">
        <ScannedQrColumn row={row} />
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <div className="hidden md:table-cell min-w-[100px]">
        <DataTableColumnHeader
          // className="flex justify-center"
          column={column}
          title={t("columns.email")}
          options={{ up: true, down: true, hide: true }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="hidden md:table-cell min-w-[100px]">
        <EmailColumn row={row} />
      </div>
    ),
  },

  {
    accessorKey: "actions",
    header: ({ column }) => (
      <div className="hidden sm:table-cell min-w-[80px]">
        <DataTableColumnHeader
          column={column}
          title={t("columns.actions")}
          options={{ hide: true }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="hidden sm:table-cell min-w-[80px]">
        <DataTableRowMenu<FpsSelectedUsersColumn>
          row={row}
          entityName={t("entityName")}
          entityLabel={t("entityLabel")}
          viewOnly={true}
        ></DataTableRowMenu>
      </div>
    ),
  },
];
