import { Table } from "@tanstack/react-table";

import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getButtons = <TData,>(table: Table<TData>) => [
  {
    icon: faAnglesLeft,
    onClick: () => table.setPageIndex(0),
    disabled: !table.getCanPreviousPage(),
  },
  {
    icon: faAngleLeft,
    onClick: () => table.previousPage(),
    disabled: !table.getCanPreviousPage(),
  },
  {
    icon: faAngleRight,
    onClick: () => table.nextPage(),
    disabled: !table.getCanNextPage(),
  },
  {
    icon: faAnglesRight,
    onClick: () => table.setPageIndex(table.getPageCount() - 1),
    disabled: !table.getCanNextPage(),
  },
];

const PaginationButtons = <TData,>({ table }: { table: Table<TData> }) => {
  const buttons = getButtons<TData>(table);

  return (
    <div className="flex items-center space-x-2">
      {buttons.map((e, i) => {
        return (
          <button
            className={` flex justify-center items-center h-8 w-8 p-0 bg-grayscale-500 bg-opacity-90 text-grayscale-100 rounded-md  ${
              e.icon === faAnglesLeft || (e.icon === faAnglesRight && "")
            }
            ${e.disabled && "opacity-30 cursor-not-allowed"}
            
            `}
            onClick={e.onClick}
            disabled={e.disabled}
            key={i}
          >
            <FontAwesomeIcon icon={e.icon} className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
};

export default PaginationButtons;
