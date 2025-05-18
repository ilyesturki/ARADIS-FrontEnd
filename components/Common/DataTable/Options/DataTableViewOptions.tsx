"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function DataTableViewOptions<TData>({
  table,
}: {
  table: Table<TData>; 
}) {
  const t = useTranslations("DataTable");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className=" hidden lg:flex items-center px-2.5 py-2.5
         text-sm text-grayscale-100 font-semibold outline-none bg-grayscale-500  dark:border-gray-500 bg-opacity-80 border rounded-md
        "
        >
          <FontAwesomeIcon icon={faSliders} className="mr-2 h-4 w-4 text-sm" />
          {t("view")}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>{t("toggleColumns")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
