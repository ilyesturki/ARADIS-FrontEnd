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
      const fpss = await fetchFpss();
      console.log(fpss);
      setFpss(fpss);
    };
    loadFpss();
  }, []);

  return <DataTable columns={columns(t)} data={fpss} />;
};

export default FpssTable;
