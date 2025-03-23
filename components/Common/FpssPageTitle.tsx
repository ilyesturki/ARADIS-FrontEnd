"use client";

import PageTitle from "@/components/Common/PageTitle";
import { useTranslations } from "next-intl";

export default function FpssPageTitle() {
  const t = useTranslations("FpssPanelPage");
  return (
    <>
      <PageTitle title={t("pageTitle")} />
    </>
  );
}
