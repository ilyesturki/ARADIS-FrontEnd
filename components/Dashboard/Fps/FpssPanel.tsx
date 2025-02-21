import DataTable from "@/components/Common/DataTable/DataTable";
import { columns } from "@/components/Common/DataTable/Columns/FpssColumn";
import { fetchFpss } from "@/utils/Api/fpsApi";

const FpssPanel = async () => {
  const fpss = await fetchFpss();

  return <DataTable columns={columns} data={fpss} />;
};

export default FpssPanel;
