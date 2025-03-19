import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

const DataTableHeader = <TData,>({ table }: { table: Table<TData> }) => {
  return (
    <TableHeader className=" bg-grayscale-500 bg-opacity-80 shadow-[0_0_2px] shadow-grayscale-400 ">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, i) => {
            return (
              <TableHead
                className={`text-grayscale-100 ${i === 0 && "rounded-l-sm"} ${
                  headerGroup.headers.length - 1 === i && "rounded-r-sm"
                }`}
                key={header.id}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default DataTableHeader;
