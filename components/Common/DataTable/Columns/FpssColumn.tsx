"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./CustomTableColumns/DataTableColumnHeader";
import DataTableRowMenu from "./CustomTableColumns/DataTableRowMenu";
import DataTableHeaderCheckBox from "./CustomTableColumns/DataTableHeaderCheckBox";
import DataTableContentCheckBox from "./CustomTableColumns/DataTableContentCheckBox";
import ClientRiskColumn from "./CustomTableColumns/ClientRiskColumn";
import FpsDateColumn from "./CustomTableColumns/FpsDateColumn";
import ImageAndTitleColumn from "./CustomTableColumns/ImageAndTitleColumn";
import DeleteFpsDialog from "../../Dialog/DeleteFpsDialog";
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
 
export const columns = (t: (key: string) => string): ColumnDef<Fpss>[] => [
  {
    accessorKey: "fpsId",
    id: "fpsId",
    header: ({ table }) => <DataTableHeaderCheckBox table={table} />,
    cell: ({ row }) => <DataTableContentCheckBox row={row} />,
  },
  {
    accessorKey: "problem.type",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex justify-center"
        column={column}
        title={t("columns.type")}
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
        title={t("columns.currentStep")}
        options={{ up: true, down: true, hide: true }}
      />
    ),
  },

  {
    accessorKey: "clientRisk",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("columns.clientRisk")}
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
        title={t("columns.when")}
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
        title={t("columns.actions")}
        options={{ hide: true }}
      />
    ),
    cell: ({ row }) => (
      <DataTableRowMenu<Fpss>
        row={row}
        entityName={t("entityName")}
        entityLabel={t("entityLabel")}
        id={row.original.fpsId}
      >
        <DeleteFpsDialog id={row.original.fpsId} />
      </DataTableRowMenu>
    ),
  },
];
