import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "@tanstack/react-table";

const DataTableSearchInput = <TData,>({ table }: { table: Table<TData> }) => {
  return (
    <div className=" flex items-center relative flex-1 bg-grayscale-200 border-[1px] border-grayscale-300 shadow-[0px_0px_2px] shadow-grayscale-400 rounded-sm">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute left-4 w-4 h-4 text-slate-400"
      />
      <input
        type="text"
        placeholder="Search Customers..."
        value={
          table.getColumn("email")
            ? (table.getColumn("email")?.getFilterValue() as string)
            : table.getColumn("mat")
            ? (table.getColumn("mat")?.getFilterValue() as string)
            : table.getColumn("fpsId")
            ? (table.getColumn("fpsId")?.getFilterValue() as string)
            : ""
        }
        onChange={
          (event) =>
            table.getColumn("email")
              ? table.getColumn("email")?.setFilterValue(event.target.value)
              : table.getColumn("mat")
              ? table.getColumn("mat")?.setFilterValue(event.target.value)
              : table.getColumn("fpsId")
              ? table.getColumn("fpsId")?.setFilterValue(event.target.value)
              : ""
          // table.getColumn("email")?.setFilterValue(event.target.value)
        }
        className=" w-full h-full px-10 py-2.5 text-sm font-normal placeholder-slate-400 bg-transparent outline-none rounded-sm"
      />
    </div>
  );
};

export default DataTableSearchInput;
