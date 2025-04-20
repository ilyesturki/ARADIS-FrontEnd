"use client";

import DataTable from "@/components/Common/DataTable/DataTable";
import { columns } from "@/components/Common/DataTable/Columns/TagSelectedUsersColumn";
import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";

const TagSelectedUsers = ({
  title,
  isSelectPageSizes,
}: {
  title?: string;
  isSelectPageSizes?: boolean;
}) => {
  const t = useTranslations("TagsPanelPage.TagPanel.TagSelectedUsers");
  const tagId = useAppSelector((state) => state.tags.tag?.tagId);
  const [users, setUsers] = useState<any[]>([]); // Ensure type consistency

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/tag/selected-users/${tagId}`
        );
        console.log(response);
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching TAG selected users:", error);
      }
    };

    fetchData();
  }, [tagId]);

  return (
    <DataTable
      columns={columns(t)}
      data={users}
      title={title}
      isSelectPageSizes={isSelectPageSizes}
    />
  );
};

export default TagSelectedUsers;
