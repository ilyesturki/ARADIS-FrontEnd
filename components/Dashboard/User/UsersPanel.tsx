import DataTable from "@/components/Common/DataTable/DataTable";
import { columns } from "@/components/Common/DataTable/Columns/UsersColumn";
import { fetchUsers } from "@/utils/Api/userApi";
import PageTitle from "@/components/Common/PageTitle";
import { useTranslations } from "next-intl";
const UsersPanel = async () => {
  const t = useTranslations("UsersPanelPage");
  const users = await fetchUsers();

  return (
    <>
      <PageTitle title={t("pageTitle")} />
      <DataTable columns={columns} data={users} />
    </>
  );
};

export default UsersPanel;
