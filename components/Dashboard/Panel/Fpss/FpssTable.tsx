"use client";
import DataTable from "@/components/Common/DataTable/DataTable";
import { columns } from "@/components/Common/DataTable/Columns/FpssColumn";
import { fetchFpss } from "@/utils/Api/fpsApi";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

const FpssTable = () => {
  const t = useTranslations("FpssPanelPage");
  const [fpss, setFpss] = useState([]);

  const line = useAppSelector((state) => state.fpss.line);

  useEffect(() => {
    const loadFpss = async () => {
      const response = await fetchFpss(`?line=${line}`);
      console.log(response.data);
      setFpss(response.data);
    };
    loadFpss();
  }, [line]);

  return <DataTable columns={columns(t)} data={fpss} />;
};

export default FpssTable;
