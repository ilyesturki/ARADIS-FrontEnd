"use client";
import { useEffect, useState } from "react";
import DataTable from "@/components/Common/DataTable/DataTable";
import { columns } from "@/components/Common/DataTable/Columns/UsersColumn";
import { fetchUsers } from "@/utils/Api/userApi";
import PageTitle from "@/components/Common/PageTitle";
import { useTranslations } from "next-intl";
const UsersPanel = () => {
  const t = useTranslations("UsersPanelPage");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  return (
    <>
      <PageTitle title={t("pageTitle")} />
      <DataTable columns={columns(t)} data={users} isSelectPageSizes={true} />
    </>
  );
};

export default UsersPanel;
