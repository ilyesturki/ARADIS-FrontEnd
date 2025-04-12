"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const DataTableRowMenu = <T extends { id: string }>({
  row,
  entityName,
  entityLabel,
  children,
  id,
  viewOnly,
}: {
  row: Row<T>;
  entityName: string;
  entityLabel: string;
  children?: React.ReactNode;
  id?: string;
  viewOnly?: boolean;
}) => {
  const t = useTranslations("DataTable"); // Use translation for the menu
  const paths = usePathname();

  const copyId = id ? id : row.original.id;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none border-none" asChild>
        <button className="flex items-center justify-center h-8 w-8 p-0 bg-neutral-100 shadow-[0_0_2px] shadow-grayscale-400 rounded-md">
          <span className="sr-only">{t("openMenu")}</span>
          <FontAwesomeIcon
            icon={faEllipsis}
            className="h-4 w-4 text-greenAccent-900 text-opacity-80"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(copyId)}
          className="cursor-pointer"
        >
          {t("copyId", { label: entityLabel })}
        </DropdownMenuItem>
        {!viewOnly && (
          <>
            <DropdownMenuSeparator />
            <Link
              href={`${paths}/${
                paths === "/dashboard/panel/fps-panel" ||
                paths === "/dashboard/panel/tag-panel"
                  ? ""
                  : "edit-"
              }${entityName}${
                id ? `?${entityName}Id=${id}` : `/${row.original.id}`
              }`}
            >
              <DropdownMenuItem className="cursor-pointer">
                {paths === "/dashboard/panel/fps-panel" ||
                paths === "/dashboard/panel/tag-panel"
                  ? t("show", { label: entityLabel })
                  : t("edit", { label: entityLabel })}
              </DropdownMenuItem>
            </Link>
            {children && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                {children}
              </DropdownMenuItem>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowMenu;
