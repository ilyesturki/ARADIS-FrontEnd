"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./CustomTableColumns/DataTableColumnHeader";
import DataTableRowMenu from "./CustomTableColumns/DataTableRowMenu";
import DataTableHeaderCheckBox from "./CustomTableColumns/DataTableHeaderCheckBox";
import DataTableContentCheckBox from "./CustomTableColumns/DataTableContentCheckBox";
// import IconAndLabelColumn from "./CustomTableColumns/IconAndLabelColumn";
import DeleteUserDialog from "../../Dialog/DeleteUserDialog";
import IconAndNameColumn from "./CustomTableColumns/IconAndNameColumn";
export type Users = {
  id: string;
  mat: string;
  image?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: "pending" | "active" | "inactive";
};

export const columns = (t: (key: string) => string): ColumnDef<Users>[] => [
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
        className="flex justify-center pl-8"
        column={column}
        title={t("columns.name")}
        options={{ hide: true }}
      />
    ),
    cell: ({ row }) => <IconAndNameColumn row={row} />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("columns.email")}
        options={{ up: true, down: true, hide: true }}
      />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("columns.phone")}
        options={{ up: true, down: true, hide: true }}
      />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("columns.status")}
        options={{ up: true, down: true, hide: true }}
      />
    ),
  },
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("columns.actions")}
        options={{ hide: true }}
      />
    ),
    cell: ({ row }) => (
      <DataTableRowMenu<Users>
        row={row}
        entityName={t("entityName")}
        entityLabel={t("entityLabel")}
      >
        <DeleteUserDialog id={row.original.id} />
      </DataTableRowMenu>
    ),
  },
];
