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
import ImageAndTitleColumn from "./CustomTableColumns/ImageAndTitleColumn";
export type Fpss = {
  id: string;
  fpsId: string;
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
        className="flex justify-center"
        column={column}
        title="Type"
        options={{ hide: true }}
      />
    ),
    cell: ({ row }) => <ImageAndTitleColumn data={row.getValue("problem")} />,
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
    accessorKey: "problem",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Quand"
        options={{ up: true, down: true, hide: true }}
      />
    ),
    cell: ({ row }) => <FpsDateColumn data={row.getValue("problem")} />,
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
      <DataTableRowMenu<Fpss> row={row} label={"fps"} id={row.original.fpsId}>
        <DeleteUserDialog id={row.original.fpsId} />
      </DataTableRowMenu>
    ),
  },
];
