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
    header: ({ table }) => (
      <div className="w-4">
        {" "}
        <DataTableHeaderCheckBox />{" "}
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-4">
        {" "}
        <DataTableContentCheckBox row={row} />
      </div>
    ),
  },
  {
    accessorKey: "problem.type",
    header: ({ column }) => (
      <div className="min-w-[180px] justify-center">
        <DataTableColumnHeader
          className="flex justify-center"
          column={column}
          title={t("columns.type")}
          options={{ hide: true }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-[180px]">
        <ImageAndTitleColumn data={row.getValue("problem")} />
      </div>
    ),
  },
  {
    accessorKey: "currentStep",
    header: ({ column }) => (
      <div className="hidden md:table-cell">
        <DataTableColumnHeader
          column={column}
          title={t("columns.currentStep")}
          options={{ up: true, down: true, hide: true }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="hidden md:table-cell dark:text-grayscale-100 dark:text-opacity-80">
        {row.getValue("currentStep")}
      </div>
    ),
  },

  {
    accessorKey: "clientRisk",
    header: ({ column }) => (
      <div className="hidden lg:table-cell min-w-[120px]">
        <DataTableColumnHeader
          column={column}
          title={t("columns.clientRisk")}
          options={{ up: true, down: true, hide: true }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="hidden lg:table-cell min-w-[120px]">
        <ClientRiskColumn row={row} />
      </div>
    ),
  },
  {
    accessorKey: "problem",
    header: ({ column }) => (
      <div className="hidden lg:table-cell min-w-[120px]">
        <DataTableColumnHeader
          column={column}
          title={t("columns.when")}
          options={{ up: true, down: true, hide: true }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="hidden lg:table-cell min-w-[120px] ">
        <FpsDateColumn data={row.getValue("problem")} />
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
        <DataTableRowMenu<Fpss>
          row={row}
          entityName={t("entityName")}
          entityLabel={t("entityLabel")}
          id={row.original.fpsId}
        >
          <DeleteFpsDialog id={row.original.fpsId} />
        </DataTableRowMenu>
      </div>
    ),
  },
];
