import DataTable from "@/components/Common/DataTable/DataTable";
import { columns } from "@/components/Common/DataTable/Columns/FpsSelectedUsersColumn";
import { fetchUsers } from "@/utils/Api/userApi";

const FpsSelectedUsers = async ({
  title,
  isSelectPageSizes,
}: {
  title?: string;
  isSelectPageSizes?: boolean;
}) => {
  const users = await fetchUsers();

  return (
    <DataTable
      columns={columns}
      data={users}
      title={title}
      isSelectPageSizes={isSelectPageSizes}
    />
  );
};

export default FpsSelectedUsers;
