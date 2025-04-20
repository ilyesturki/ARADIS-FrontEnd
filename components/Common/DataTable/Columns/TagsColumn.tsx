"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./CustomTableColumns/DataTableColumnHeader";
import DataTableRowMenu from "./CustomTableColumns/DataTableRowMenu";
import DataTableHeaderCheckBox from "./CustomTableColumns/DataTableHeaderCheckBox";
import DataTableContentCheckBox from "./CustomTableColumns/DataTableContentCheckBox";

import TagImageAndStatusColumn from "./TagImageAndStatusColumn";
export type Tags = {
  id: string;
  tagId: string;
  zone: string;
  machine: string;
  equipment: string;
  image: string;
  // images: string[];
  // qrCodeUrl: string;
  status: "open" | "toDo" | "done";
  // closeDate: Date;
};

export const columns = (t: (key: string) => string): ColumnDef<Tags>[] => [
  {
    accessorKey: "tagId",
    id: "tagId",
    header: ({ table }) => <DataTableHeaderCheckBox table={table} />,
    cell: ({ row }) => <DataTableContentCheckBox row={row} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("columns.status")}
        options={{ hide: true }}
        className="flex justify-center"
      />
    ),
    cell: ({ row }) => <TagImageAndStatusColumn row={row} />,
  },
  {
    accessorKey: "zone",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("columns.zone")}
        options={{ up: true, down: true, hide: true }}
      />
    ),
  },
  {
    accessorKey: "machine",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("columns.machine")}
        options={{ hide: true }}
      />
    ),
    // cell: ({ row }) => <ImageAndTitleColumn data={row.getValue("problem")} />,
  },
  {
    accessorKey: "equipment",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("columns.equipment")}
        options={{ hide: true }}
      />
    ),
    // cell: ({ row }) => <ImageAndTitleColumn data={row.getValue("problem")} />,
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
      <DataTableRowMenu<Tags>
        row={row}
        entityName={t("entityName")}
        entityLabel={t("entityLabel")}
        id={row.original.tagId}
      >
        {/* <DeleteTagDialog id={row.original.tagId} /> */}
      </DataTableRowMenu>
    ),
  },
];
