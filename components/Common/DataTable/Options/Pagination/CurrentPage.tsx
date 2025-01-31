import { Table } from "@tanstack/react-table";

const CurrentPage = <TData,>({ table }: { table: Table<TData> }) => {
  return (
    <span className="flex items-center justify-center text-sm font-medium">
      Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
    </span>
  );
};

export default CurrentPage;
