"use client";
import DataTable from "@/components/Common/DataTable/DataTable";
import { columns } from "@/components/Common/DataTable/Columns/TagsColumn";
import { fetchTags } from "@/utils/Api/tagApi";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

const TagsTable = () => {
  const t = useTranslations("TagsPanelPage");
  const [tags, setTags] = useState([]);

  const machine = useAppSelector((state) => state.tags.machine);

  useEffect(() => {
    const loadTags = async () => {
      const response = await fetchTags(`?machine=${machine}`);
      setTags(response.data);
    };
    loadTags();
  }, [machine]);

  return <DataTable columns={columns(t)} data={tags} />;
};

export default TagsTable;
