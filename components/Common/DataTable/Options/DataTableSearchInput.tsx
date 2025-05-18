"use client";

import { useTranslations } from "next-intl";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "@tanstack/react-table";

const DataTableSearchInput = <TData,>({ table }: { table: Table<TData> }) => {
  const t = useTranslations("DataTable");

  // Get available column IDs
  const columnIds = table.getAllColumns().map((col) => col.id);
  console.log("Available columns:", columnIds);

  // Prioritize filtering by email, mat, or fpsId
  const searchColumn = columnIds.includes("email")
    ? "email"
    : columnIds.includes("mat")
    ? "mat"
    : columnIds.includes("fpsId")
    ? "fpsId"
    : columnIds[0] || ""; // Use the first column if no match

  return (
    <div className="flex items-center relative flex-1 bg-sidebar-accent border  dark:border-gray-700 rounded-md">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute left-4 w-4 h-4 text-grayscale-500  dark:text-gray-300 "
      />
      {searchColumn && (
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={
            (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
          className="w-full h-full px-10 py-2.5 text-sm font-normal placeholder-grayscale-500  dark:text-gray-300 dark:placeholder-gray-400 placeholder-opacity-80 bg-transparent outline-none rounded-sm"
        />
      )}
    </div>
  );
};

export default DataTableSearchInput;
