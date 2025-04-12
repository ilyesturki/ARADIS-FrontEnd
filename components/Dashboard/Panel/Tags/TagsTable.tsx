"use client";
import DataTable from "@/components/Common/DataTable/DataTable";
import { columns } from "@/components/Common/DataTable/Columns/TagsColumn";
import { fetchTags } from "@/utils/Api/tagApi";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const TagsTable = () => {
  const t = useTranslations("TagsPanelPage");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const loadTags = async () => {
      const response = await fetchTags();
      console.log(response.data);
      setTags(response.data);
    };
    loadTags();
  }, []);

  return <DataTable columns={columns(t)} data={tags} />;
};

export default TagsTable;
