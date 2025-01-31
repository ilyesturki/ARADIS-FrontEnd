import { Table } from "@tanstack/react-table";

const SelectedRows = <TData,>({ table }: { table: Table<TData> }) => {
  return (
    <div className="flex-1 text-xs text-muted-foreground">
      {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>
  );
};

export default SelectedRows;
