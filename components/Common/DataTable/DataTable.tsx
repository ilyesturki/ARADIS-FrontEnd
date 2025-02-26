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
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}) => {
  const [table] = useDataTable({ columns, data });

  return (
    <div className=" flex flex-col gap-4 px-3 py-4 bg-grayscale-100 rounded-[7px] shadow-[0_0_2px] shadow-grayscale-400 ">
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
      <Pagination table={table} />
    </div>
  );
};

export default DataTable;
