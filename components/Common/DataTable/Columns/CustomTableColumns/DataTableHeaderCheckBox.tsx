import { Table } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

const DataTableHeaderCheckBox = <T,>({ table }: { table: Table<T> }) => {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="border-grayscale-100"
    />
  );
};

export default DataTableHeaderCheckBox;
