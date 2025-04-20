"use client";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import CustomDateTimePicker from "@/components/Common/CustomInput/CustomDateTimePicker";
import {
  fpsDefensiveActionType,
} from "@/redux/fps/fpsSlice";
import { useTranslations } from "next-intl";

const DefensiveAction = ({
  fpsData,
  categoryData,
  serviceData,
  customProcedureChange,
  customCategoryChange,
  customServiceChange,
  customQuandChange,
  disabled,
}: {
  fpsData: fpsDefensiveActionType;
  categoryData: { value: string; label: string }[];
  serviceData: { value: string; label: string }[];
  customProcedureChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  customCategoryChange: (userCategory: string) => void;
  customServiceChange: (userService: string) => void;
  customQuandChange: (
    date: Date | undefined,
    name?: string | undefined
  ) => void;
  disabled?: boolean;
}) => {
  const t = useTranslations(
    "CreateFps.defensiveActions.defensiveActions.defensiveAction"
  );
  return (
    <div className=" flex flex-col gap-4">
      <CustomTextArea
        value={fpsData.procedure}
        onChange={customProcedureChange}
        label={t("procedure.label")}
        placeholder={t("procedure.placeholder")}
        disabled={disabled}
      />
      <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
        <CustomSelect
          label={t("department.label")}
          value={fpsData.userService}
          onChange={customServiceChange}
          data={serviceData}
          disabled={disabled}
        />
        <CustomSelect
          label={t("category.label")}
          value={fpsData.userCategory}
          onChange={customCategoryChange}
          data={categoryData}
          disabled={disabled}
        />
      </div>
      <CustomDateTimePicker
        label={t("when.label")}
        value={fpsData.quand}
        onChange={customQuandChange}
        disabled={disabled}
      />
    </div>
  );
};

export default DefensiveAction;
