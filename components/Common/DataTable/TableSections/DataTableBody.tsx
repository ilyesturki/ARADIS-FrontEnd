import { ColumnDef, Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import { useTranslations } from "next-intl";

const DataTableBody = <TData, TValue>({
  table,
  columns,
}: {
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
}) => {
  const t = useTranslations("DataTable");
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            {t("noResults")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default DataTableBody;
