"use client";

import PageTitle from "@/components/Common/PageTitle";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ComboBox from "./ComboBox";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLine } from "@/redux/fps/fpsSlice";

const data = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "line1",
    label: "Line 1",
  },
  {
    value: "line2",
    label: "Line 2",
  },
  {
    value: "line3",
    label: "Line 3",
  },
  {
    value: "line4",
    label: "Line 4",
  },
];

export default function FpssHeader() {
  const t = useTranslations("FpssPanelPage");
  // const [line, setLine] = useState("all");
  const dispatch = useAppDispatch();
  const line = useAppSelector((state) => state.fpss.line);
  const handleLine = (e: string) => {
    dispatch(setLine(e));
  };
  return (
    <>
      <PageTitle title={t("pageTitle")}>
        <ComboBox
          label="Line"
          selectedValue={line}
          onChange={handleLine}
          data={data}
          className="w-fit !border-solid rounded-md shadow-none text-sm font-semibold text-gray-600"
        />
      </PageTitle>
    </>
  );
}
