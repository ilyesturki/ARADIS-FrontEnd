"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./CustomTableColumns/DataTableColumnHeader";
import DataTableRowMenu from "./CustomTableColumns/DataTableRowMenu";
import DataTableHeaderCheckBox from "./CustomTableColumns/DataTableHeaderCheckBox";
import DataTableContentCheckBox from "./CustomTableColumns/DataTableContentCheckBox";

import TagImageAndStatusColumn from "./CustomTableColumns/TagImageAndStatusColumn";
export type Tags = {
  id: string;
  tagId: string;
  zone: string;
  machine: string;
  equipment: string;
  image: string;
  status: "open" | "toDo" | "done";
};

export const columns = (t: (key: string) => string): ColumnDef<Tags>[] => [
  {
    accessorKey: "tagId",
    id: "tagId",
    header: ({ table }) => <DataTableHeaderCheckBox />,
    cell: ({ row }) => <DataTableContentCheckBox row={row} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="min-w-[140px]">
        <DataTableColumnHeader
          column={column}
          title={t("columns.status")}
          options={{ hide: true }}
          className="flex justify-center"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-[140px]">
        <TagImageAndStatusColumn row={row} />
      </div>
    ),
  },
  {
    accessorKey: "zone",
    header: ({ column }) => (
      <div className="hidden md:table-cell min-w-[100px]">
        <DataTableColumnHeader
          column={column}
          title={t("columns.zone")}
          options={{ up: true, down: true, hide: true }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="hidden md:table-cell min-w-[100px]">
        {row.getValue("zone")}
      </div>
    ),
  },
  {
    accessorKey: "machine",
    header: ({ column }) => (
      <div className="hidden md:table-cell min-w-[100px]">
        <DataTableColumnHeader
          column={column}
          title={t("columns.machine")}
          options={{ hide: true }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="hidden md:table-cell min-w-[100px]">
        {row.getValue("machine")}
      </div>
    ),
  },
  {
    accessorKey: "equipment",
    header: ({ column }) => (
      <div className="hidden lg:table-cell min-w-[100px]">
        <DataTableColumnHeader
          column={column}
          title={t("columns.equipment")}
          options={{ hide: true }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="hidden lg:table-cell min-w-[100px]">
        {row.getValue("equipment")}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <div className="min-w-[70px]">
        <DataTableColumnHeader
          column={column}
          title={t("columns.actions")}
          options={{ hide: true }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-[70px]">
        <DataTableRowMenu<Tags>
          row={row}
          entityName={t("entityName")}
          entityLabel={t("entityLabel")}
          id={row.original.tagId}
        >
          {/* <DeleteTagDialog id={row.original.tagId} /> */}
        </DataTableRowMenu>
      </div>
    ),
  },
];
