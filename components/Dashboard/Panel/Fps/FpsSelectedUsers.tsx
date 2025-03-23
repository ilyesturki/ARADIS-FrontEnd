"use client";

import DataTable from "@/components/Common/DataTable/DataTable";
import { columns } from "@/components/Common/DataTable/Columns/FpsSelectedUsersColumn";
import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";

const FpsSelectedUsers = ({
  title,
  isSelectPageSizes,
}: {
  title?: string;
  isSelectPageSizes?: boolean;
}) => {
  const t = useTranslations("FpssPanelPage.FpsPanel.FpsSelectedUsers");
  const fpsId = useAppSelector((state) => state.fpss.fps?.fpsId);
  const [users, setUsers] = useState<any[]>([]); // Ensure type consistency

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/fps/selected-users/${fpsId}`
        );
        console.log(response);
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching FPS selected users:", error);
      }
    };

    fetchData();
  }, [fpsId]);

  return (
    <DataTable
      columns={columns(t)}
      data={users}
      title={title}
      isSelectPageSizes={isSelectPageSizes}
    />
  );
};

export default FpsSelectedUsers;
