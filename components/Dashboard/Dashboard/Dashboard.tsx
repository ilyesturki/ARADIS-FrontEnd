"use client";
import React, { useEffect, useState } from "react";
import Fps from "./components/Fps";
import PageTitle from "@/components/Common/PageTitle";
import { useTranslations } from "next-intl";
import { fetchMyHelperFpss } from "@/utils/Api/fpsApi";
import { FpsType } from "@/redux/fps/fpsSlice";

import { useSearchParams } from "next/navigation";

const Dashboard = () => {
  const t = useTranslations("DashboardPage");
  const searchParams = useSearchParams();
  const selectedFpsId = searchParams.get("fpsId");
  const [fpss, setFpss] = useState([]);

  useEffect(() => {
    const loadFpss = async () => {
      const fpss = await fetchMyHelperFpss();
      setFpss(fpss);
    };
    loadFpss();
  }, []);
  return (
    <>
      <PageTitle title={t("pageTitle")} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
        {fpss.map((fps: FpsType) => (
          <Fps key={fps.fpsId} fps={fps} isSelected={fps.fpsId=== selectedFpsId} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
