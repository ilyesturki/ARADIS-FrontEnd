import { Row } from "@tanstack/react-table";
const DataTableContentCheckBox = <T,>({ row }: { row: Row<T> }) => {
  return (
    <span className="pl-1 text-greenAccent-900 text-opacity-40 dark:text-grayscale-100 dark:text-opacity-80 font-bold">
      {row.index + 1}
    </span>
  );
};

export default DataTableContentCheckBox;

