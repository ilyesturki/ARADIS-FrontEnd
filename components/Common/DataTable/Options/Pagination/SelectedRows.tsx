import { Table } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

const SelectedRows = <TData,>({ table }: { table: Table<TData> }) => {
  const t = useTranslations("DataTable");
  return (
    <div className="flex-1 text-xs text-muted-foreground">
      {t("rowsSelected", {
        selected: table.getFilteredSelectedRowModel().rows.length,
        total: table.getFilteredRowModel().rows.length,
      })}
    </div>
  );
};

export default SelectedRows;
