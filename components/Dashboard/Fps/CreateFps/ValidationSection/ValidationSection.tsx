"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import useValidationSection from "./useValidationSection";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage";

import CustomSelectImages from "@/components/Common/CustomInput/CustomSelectImages";
import CustomSwitch from "@/components/Common/CustomInput/CustomSwitch";
import CustomDateTimePicker from "@/components/Common/CustomInput/CustomDateTimePicker";
import CustomPicker from "@/components/Common/CustomInput/CustomPicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Comments from "./Comments";
import CustomText from "@/components/Common/CustomInput/CustomText";
import { useTranslations } from "next-intl";

const ValidationSection = () => {
  const t = useTranslations("CreateFps.validation");
  const {
    isAdminOrManager,
    currentStep,
    isDisabled,
    isDone,
    fpsData,
    setFpsData,
    fpsId,
    fpsCompleted,
    handleStatusChange,
    handleSubmit,
    handleReset,
    submitBtnValue,
  } = useValidationSection();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[6fr_4fr] gap-10 ">
      <div className="flex flex-col gap-2">
        {/* <span className=" text-center text-lg font-bold capitalize text-grayscale-400">
          Comments
        </span> */}
        <Comments />
      </div>
      <div className=" flex flex-col gap-10">
        <CustomInput
          value={fpsId}
          label={t("fpsId.label")}
          placeholder={t("fpsId.placeholder")}
          name="fpsId"
          copy
          disabled
        />
        <CustomSwitch
          title={t("status.title")}
          checked={fpsCompleted}
          onChange={handleStatusChange}
          disabled={isDisabled}
          checkedColor="text-greenAccent-900"
          unCheckedColor="text-redAccent-900"
          checkedValue={t("status.checkedValue")}
          unCheckedValue={t("status.unCheckedValue")}
          checkedBgColor="!bg-greenAccent-600"
          unCheckedBgColor="!bg-redAccent-900"
        />
        {isDone ? (
          <CustomText title={t("doneStatus.done")} />
        ) : isAdminOrManager ? (
          <CustomText title={t("doneStatus.notAllowed")} />
        ) : isDisabled ? (
          <CustomText title={t("doneStatus.disabled")} />
        ) : (
          <CustomButtons
            value={
              submitBtnValue === "Save"
                ? t("buttons.saveButtonText")
                : t("buttons.updateButtonText")
            }
            mainButtonOnCLick={handleSubmit}
            secondaryButtonOnCLick={handleReset}
            secondaryButtonText={t("buttons.secondaryButtonText")}
          />
        )}
      </div>
    </div>
  );
};

export default ValidationSection;
