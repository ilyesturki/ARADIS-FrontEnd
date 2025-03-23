"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import useCauseSection from "./useCauseSection";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage";

import CustomSelectImages from "@/components/Common/CustomInput/CustomSelectImages";
import CustomSwitch from "@/components/Common/CustomInput/CustomSwitch";
import CustomDateTimePicker from "@/components/Common/CustomInput/CustomDateTimePicker";
import CustomPicker from "@/components/Common/CustomInput/CustomPicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import WhyList from "./WhyList";
import CustomText from "@/components/Common/CustomInput/CustomText";
import { useTranslations } from "next-intl";

const CauseSection = () => {
  const t = useTranslations("CreateFps.cause");
  const {
    isAdminOrManager,
    currentStep,
    isDisabled,
    isDone,
    fpsData,
    fpsId,
    addNewWhy,
    removeWhy,
    causeData,
    handleCauseChange,
    handleChangeWhyList,
    handleSubmit,
    handleReset,
    submitBtnValue,
  } = useCauseSection();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className="flex flex-col gap-2">
        <WhyList
          whyList={fpsData.whyList}
          addNewWhy={addNewWhy}
          removeWhy={removeWhy}
          handleChangeWhyList={handleChangeWhyList}
          disabled={isDisabled}
        />
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
        <CustomPicker
          label={t("cause.label")}
          selectedData={fpsData.causeList || []}
          handleChange={handleCauseChange}
          data={causeData || []}
          disabled={isDisabled}
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

export default CauseSection;
