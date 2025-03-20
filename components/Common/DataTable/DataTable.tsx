"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Table } from "@/components/ui/table";

import Pagination from "./Options/Pagination/Pagination";
import { DataTableViewOptions } from "./Options/DataTableViewOptions";
import DataTableSearchInput from "./Options/DataTableSearchInput";
import useDataTable from "./Hooks/useDataTable";
import DataTableHeader from "./TableSections/DataTableHeader";
import DataTableBody from "./TableSections/DataTableBody";

const DataTable = <TData, TValue>({
  columns,
  data,
  title,
  isSelectPageSizes,
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  isSelectPageSizes?: boolean;
}) => {
  const [table] = useDataTable({ columns, data, isSelectPageSizes });

  return (
    <div className=" flex flex-col gap-4 px-3 py-4 bg-grayscale-100 border rounded-md">
      {title && (
        <span className="w-full px-2 text-lg font-medium text-grayscale-500 text-opacity-90 capitalize ">
          {title}
        </span>
      )}

      <div className="flex items-center justify-between gap-6 px-4">
        <DataTableSearchInput table={table} />
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-sm">
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} columns={columns} />
        </Table>
      </div>
      <Pagination table={table} isSelectPageSizes={isSelectPageSizes} />
    </div>
  );
};

export default DataTable;
