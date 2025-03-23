"use client";
import { useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";

const SelectPageSize = <TData,>({ table }: { table: Table<TData> }) => {
  const t = useTranslations("DataTable");
  const pageSizeList = [5, 10, 20, 30, 40, 50];
  return (
    <div className="flex items-center gap-2">
      <p className="text-xs font-medium">{t("rowsPerPage")}</p>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className=" flex gap-2 h-7 w-14 text-xs font-medium">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {pageSizeList.map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPageSize;
