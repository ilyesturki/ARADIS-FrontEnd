import DataTable from "@/components/Common/DataTable/DataTable";
import { columns } from "@/components/Common/DataTable/Columns/FpssColumn";
import { fetchFpss } from "@/utils/Api/fpsApi";

const FpssTable = async () => {
  const fpss = await fetchFpss();
  console.log(fpss);
  return <DataTable columns={columns} data={fpss} />;
};

export default FpssTable;
