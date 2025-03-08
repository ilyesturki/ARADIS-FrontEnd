import DataTable from "@/components/Common/DataTable/DataTable";
import { columns } from "@/components/Common/DataTable/Columns/FpssColumn";
import { fetchMyFpss } from "@/utils/Api/fpsApi";

const MyFpsPanel = async () => {
  const fpss = await fetchMyFpss();
  console.log(fpss);
  return <DataTable columns={columns} data={fpss} />;
};

export default MyFpsPanel;
