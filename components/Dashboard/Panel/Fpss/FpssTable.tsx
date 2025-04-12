"use client";
import DataTable from "@/components/Common/DataTable/DataTable";
import { columns } from "@/components/Common/DataTable/Columns/FpssColumn";
import { fetchFpss } from "@/utils/Api/fpsApi";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const FpssTable = () => {
  const t = useTranslations("FpssPanelPage");
  const [fpss, setFpss] = useState([]);

  useEffect(() => {
    const loadFpss = async () => {
      const response = await fetchFpss();
      console.log(response.data);
      setFpss(response.data);
    };
    loadFpss();
  }, []);

  return <DataTable columns={columns(t)} data={fpss} />;
};

export default FpssTable;
