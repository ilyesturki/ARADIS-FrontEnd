"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./CustomTableColumns/DataTableColumnHeader";
import DataTableRowMenu from "./CustomTableColumns/DataTableRowMenu";
import DataTableHeaderCheckBox from "./CustomTableColumns/DataTableHeaderCheckBox";
import DataTableContentCheckBox from "./CustomTableColumns/DataTableContentCheckBox";
// import IconAndLabelColumn from "./CustomTableColumns/IconAndLabelColumn";
import DeleteUserDialog from "../../Dialog/DeleteUserDialog";
import IconAndNameColumn from "./CustomTableColumns/IconAndNameColumn";
import ClientRiskColumn from "./CustomTableColumns/ClientRiskColumn";
import FpsDateColumn from "./CustomTableColumns/FpsDateColumn";
export type Fpss = {
  id: string;
  currentStep: "problem" | "immediateActions" | "cause" | "defensiveActions";
  problem: {
    type: string;
    quand: string;
    clientRisk: boolean;
    image?: string;
  };
};

export const columns: ColumnDef<Fpss>[] = [
  {
    accessorKey: "select",
    id: "select",
    header: ({ table }) => <DataTableHeaderCheckBox table={table} />,
    cell: ({ row }) => <DataTableContentCheckBox row={row} />,
  },
  {
    accessorKey: "problem.type",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="type"
        options={{ up: true, down: true, hide: true }}
      />
    ),
  },
  {
    accessorKey: "currentStep",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="currentStep"
        options={{ up: true, down: true, hide: true }}
      />
    ),
  },

  {
    accessorKey: "clientRisk",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="clientRisk"
        options={{ up: true, down: true, hide: true }}
      />
    ),
    cell: ({ row }) => <ClientRiskColumn row={row} />,
  },
  {
    accessorKey: "problem.quand",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Quand"
        options={{ up: true, down: true, hide: true }}
      />
    ),
    cell: ({ row }) => <FpsDateColumn row={row} />,
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
      <DataTableRowMenu<Fpss> row={row} label={"fps"}>
        <DeleteUserDialog id={row.original.id} />
      </DataTableRowMenu>
    ),
  },
];
