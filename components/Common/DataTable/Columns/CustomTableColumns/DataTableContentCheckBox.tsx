import { Row } from "@tanstack/react-table";
// import { Checkbox } from "@/components/ui/checkbox";

const DataTableContentCheckBox = <T,>({ row }: { row: Row<T> }) => {
  return (
    <span className="pl-1 text-greenAccent-900 text-opacity-40 font-bold">
      {row.index + 1}
    </span>
  );
};

export default DataTableContentCheckBox;

{
  /* <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      className="border-greenAccent-900"
    /> */
}
