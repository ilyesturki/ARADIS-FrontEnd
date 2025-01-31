import { Table } from "@tanstack/react-table";

import SelectPageSize from "./SelectPageSize";
import PaginationButtons from "./PaginationButtons";
import SelectedRows from "./SelectedRows";
import CurrentPage from "./CurrentPage";

const Pagination = <TData,>({ table }: { table: Table<TData> }) => {
  return (
    <div className="flex flex-wrap items-center justify-between px-8 py-4">
      <SelectedRows table={table} />
      <div className="flex items-center gap-8">
        <SelectPageSize table={table} />
        <div className="flex items-center gap-4">
          <CurrentPage table={table} />
          <PaginationButtons table={table} />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
