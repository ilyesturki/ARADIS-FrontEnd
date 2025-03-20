"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./CustomTableColumns/DataTableColumnHeader";
import DataTableRowMenu from "./CustomTableColumns/DataTableRowMenu";
import DataTableHeaderCheckBox from "./CustomTableColumns/DataTableHeaderCheckBox";
import DataTableContentCheckBox from "./CustomTableColumns/DataTableContentCheckBox";
// import IconAndLabelColumn from "./CustomTableColumns/IconAndLabelColumn";
import DeleteUserDialog from "../../Dialog/DeleteUserDialog";
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

export const columns: ColumnDef<FpsSelectedUsersColumn>[] = [
  {
    accessorKey: "select",
    id: "select",
    header: ({ table }) => <DataTableHeaderCheckBox table={table} />,
    cell: ({ row }) => <DataTableContentCheckBox row={row} />,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="pl-[70px]"
        column={column}
        title="Name"
        options={{ hide: true }}
      />
    ),
    cell: ({ row }) => <IconAndNameColumn row={row} className="w-10 h-10" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader
        // className="flex justify-center"
        column={column}
        title="Email"
        options={{ up: true, down: true, hide: true }}
      />
    ),
    cell: ({ row }) => <EmailColumn row={row} />,
  },
  {
    accessorKey: "scanStatus",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        options={{ up: true, down: true, hide: true }}
        // className="justify-center"
      />
    ),
    cell: ({ row }) => <ScannedQrColumn row={row} />,
  },
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        options={{ hide: true }}
      />
    ),
    cell: ({ row }) => (
      <DataTableRowMenu<FpsSelectedUsersColumn> row={row} label={"user"}>
        <DeleteUserDialog id={row.original.id} />
      </DataTableRowMenu>
    ),
  },
];
