"use client";
import DataTable from "@/components/Common/DataTable/DataTable";
import { columns } from "@/components/Common/DataTable/Columns/FpssColumn";
import { fetchMyFpss } from "@/utils/Api/fpsApi";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import FpssHeader from "@/components/Common/FpssHeader";

const MyFpsPanel = () => {
  const t = useTranslations("FpssPanelPage");
  const [fpss, setFpss] = useState([]);

  useEffect(() => {
    const loadFpss = async () => {
      const fpss = await fetchMyFpss();
      setFpss(fpss);
    };
    loadFpss();
  }, []);

  return (
    <>
      <FpssHeader />
      <DataTable columns={columns(t)} data={fpss} />
    </>
  );
};

export default MyFpsPanel;
