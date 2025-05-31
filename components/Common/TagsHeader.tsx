"use client";

import PageTitle from "@/components/Common/PageTitle";
import { useTranslations } from "next-intl";
import ComboBox from "./ComboBox";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setMachine } from "@/redux/tag/tagSlice";
import { machineData } from "@/data/tag";

export default function TagsHeader() {
  const t = useTranslations("TagsPanelPage");
  const dispatch = useAppDispatch();
  const machine = useAppSelector((state) => state.tags.machine);
  const handleMachine = (e: string) => { 
    dispatch(setMachine(e));
  };
  return (
    <>
      <PageTitle title={t("pageTitle")}>
        <ComboBox
          label="Machine"
          selectedValue={machine}
          onChange={handleMachine}
          data={[
            {
              value: "",
              label: "All",
            },
            ...machineData,
          ]}
          className="w-fit !px-4 !border-solid rounded-md shadow-none text-sm font-semibold text-gray-600 dark:bg-neutral-200/10 dark:text-neutral-50 dark:border-neutral-50/10"
        />
      </PageTitle>
    </>
  );
}
