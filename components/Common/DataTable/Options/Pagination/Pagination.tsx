import { Table } from "@tanstack/react-table";

import SelectPageSize from "./SelectPageSize";
import PaginationButtons from "./PaginationButtons";
import CurrentPage from "./CurrentPage";

const Pagination = <TData,>({
  table,
  isSelectPageSizes,
}: {
  table: Table<TData>;
  isSelectPageSizes?: boolean;
}) => {
  return (
    <div className="w-full flex flex-wrap items-center justify-end sm:px-8 py-4 dark:text-gray-400">
      {/* <SelectedRows table={table} /> */}
      <div className="flex items-center gap-8">
        {isSelectPageSizes && <SelectPageSize table={table} />}
        <div className="flex items-center gap-4">
          <CurrentPage table={table} />
          <PaginationButtons table={table} />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
