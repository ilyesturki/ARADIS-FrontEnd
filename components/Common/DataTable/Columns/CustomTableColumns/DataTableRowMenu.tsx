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
import { usePathname } from "next/navigation";
const DataTableRowMenu = <T extends { id: string }>({
  row,
  label,
  children,
  id,
}: {
  row: Row<T>;
  label: string;
  children?: React.ReactNode;
  id?: string;
}) => {
  const paths = usePathname();
  console.log(paths);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none border-none" asChild>
        <button className=" flex items-center justify-center h-8 w-8 p-0 bg-grayscale-500 bg-opacity-5 shadow-[0_0_2px] shadow-grayscale-400 rounded-md">
          <span className="sr-only">Open menu</span>
          <FontAwesomeIcon
            icon={faEllipsis}
            className="h-4 w-4 text-grayscale-500 text-opacity-80"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(id ? id : row.original.id)
          }
          className=" cursor-pointer"
        >
          Copy {label} ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link
          href={`${paths}/${
            paths !== "/dashboard/panel/fps-panel" ? "edit-" : ""
          }${label}${id ? `?${label}Id=${id}` : `/${row.original.id}`}`}
        >
          <DropdownMenuItem className=" cursor-pointer">
            {paths !== "/dashboard/panel/fps-panel" ? "Edit " : "show "}
            {label}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className=" cursor-pointer"
          onClick={(e) => e.preventDefault()}
        >
          {children}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowMenu;
