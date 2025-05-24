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
    header: ({ table }) => <DataTableHeaderCheckBox />,
    cell: ({ row }) => <DataTableContentCheckBox row={row} />,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="pl-20"
        column={column}
        title={t("columns.name")}
        options={{ hide: true }}
      />
    ),
    cell: ({ row }) => <IconAndNameColumn row={row} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="hidden sm:table-cell min-w-[100px]">
        <DataTableColumnHeader
          column={column}
          title={t("columns.status")}
          options={{ up: true, down: true, hide: true }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="hidden sm:table-cell min-w-[100px]">
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <div className="hidden md:table-cell min-w-[200px]">
        <DataTableColumnHeader
          column={column}
          title={t("columns.email")}
          options={{ up: true, down: true, hide: true }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="hidden md:table-cell min-w-[200px]">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <div className="hidden lg:table-cell min-w-[150px]">
        <DataTableColumnHeader
          column={column}
          title={t("columns.phone")}
          options={{ up: true, down: true, hide: true }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="hidden lg:table-cell min-w-[150px]">
        {row.getValue("phone")}
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
        <DataTableRowMenu<Users>
          row={row}
          entityName={t("entityName")}
          entityLabel={t("entityLabel")}
        >
          <DeleteUserDialog id={row.original.id} />
        </DataTableRowMenu>
      </div>
    ),
  },
];
