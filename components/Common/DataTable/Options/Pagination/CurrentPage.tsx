"use client";

import { Table } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

const CurrentPage = <TData,>({ table }: { table: Table<TData> }) => {
  const t = useTranslations("DataTable");
  return (
    <span className="flex items-center justify-center text-sm font-medium">
      {t("pageInfo", {
        current: table.getState().pagination.pageIndex + 1,
        total: table.getPageCount(),
      })}
    </span>
  );
};

export default CurrentPage;
