import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
  faEyeSlash,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  options,
}: {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
  options?: { up?: boolean; down?: boolean; hide?: boolean };
}) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div
      className={cn(
        "flex items-center space-x-2 text-grayscale-800 text-opacity-60",
        className
      )}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span className=" text-sm font-semibold">{title}</span>
            {(options?.up || options?.down) &&
              (column.getIsSorted() === "desc" ? (
                <FontAwesomeIcon
                  icon={faArrowDownWideShort}
                  className="ml-2 h-4 w-4"
                />
              ) : column.getIsSorted() === "asc" ? (
                <FontAwesomeIcon
                  icon={faArrowUpWideShort}
                  className="ml-2 h-4 w-4"
                />
              ) : (
                <FontAwesomeIcon icon={faSort} className="ml-2 h-4 w-4" />
              ))}
          </Button>
        </DropdownMenuTrigger>
        {options && (
          <DropdownMenuContent align="start">
            {options?.up && (
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <FontAwesomeIcon
                  icon={faArrowUpWideShort}
                  className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                />
                Asc
              </DropdownMenuItem>
            )}
            {options?.down && (
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <FontAwesomeIcon
                  icon={faArrowDownWideShort}
                  className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                />
                Desc
              </DropdownMenuItem>
            )}
            {(options?.up || options?.down) && options?.hide && (
              <DropdownMenuSeparator />
            )}

            {options?.hide && (
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                />
                Hide
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
