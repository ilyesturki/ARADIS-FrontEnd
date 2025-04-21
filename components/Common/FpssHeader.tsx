"use client";

import PageTitle from "@/components/Common/PageTitle";
import { useTranslations } from "next-intl";
import ComboBox from "./ComboBox";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLine } from "@/redux/fps/fpsSlice";
import { lineData } from "@/data/fps";

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
          data={[
            {
              value: "",
              label: "All",
            },
            ...lineData,
          ]}
          className="w-fit !border-solid rounded-md shadow-none text-sm font-semibold text-gray-600"
        />
      </PageTitle>
    </>
  );
}
