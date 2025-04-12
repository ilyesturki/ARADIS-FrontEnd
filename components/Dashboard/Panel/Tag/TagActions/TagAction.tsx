"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage";

import CustomSelectImages from "@/components/Common/CustomInput/CustomSelectImages";
import CustomSwitch from "@/components/Common/CustomInput/CustomSwitch";
import CustomDateTimePicker from "@/components/Common/CustomInput/CustomDateTimePicker";
import CustomPicker from "@/components/Common/CustomInput/CustomPicker";
import { TagActionType } from "@/redux/tag/tagSlice";
import { useTranslations } from "next-intl";

const DefensiveAction = ({
  tagData,
  categoryData,
  serviceData,
  customProcedureChange,
  customCategoryChange,
  customServiceChange,
  customQuandChange,
  disabled,
}: {
  tagData: TagActionType;
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
    "CreateTag.defensiveActions.defensiveActions.defensiveAction"
  );
  return (
    <div className=" flex flex-col gap-4">
      <CustomTextArea
        value={tagData.procedure}
        onChange={customProcedureChange}
        label={t("procedure.label")}
        placeholder={t("procedure.placeholder")}
        disabled={disabled}
      />
      <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
        <CustomSelect
          label={t("department.label")}
          value={tagData.userService}
          onChange={customServiceChange}
          data={serviceData}
          disabled={disabled}
        />
        <CustomSelect
          label={t("category.label")}
          value={tagData.userCategory}
          onChange={customCategoryChange}
          data={categoryData}
          disabled={disabled}
        />
      </div>
      <CustomDateTimePicker
        label={t("when.label")}
        value={tagData.quand}
        onChange={customQuandChange}
        disabled={disabled}
      />
    </div>
  );
};

export default DefensiveAction;
