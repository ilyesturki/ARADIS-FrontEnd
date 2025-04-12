"use client";

import PageTitle from "@/components/Common/PageTitle";
import { useTranslations } from "next-intl";

export default function TagsPageTitle() {
  const t = useTranslations("TagsPanelPage");
  return (
    <>
      <PageTitle title={t("pageTitle")} />
    </>
  );
}
