"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import useDefensiveActionsSection from "./useDefensiveActionsSection";

import DefensiveActions from "./DefensiveActions/DefensiveActions";
import CustomText from "@/components/Common/CustomInput/CustomText";
import { useTranslations } from "next-intl";

const DefensiveActionsSection = () => {
  const t = useTranslations("CreateFps.defensiveActions");
  const {
    isAdminOrManager,
    currentStep,
    isDisabled,
    isDone,
    fpsData,
    fpsId,
    categoryData,
    serviceData,
    handleChangeInArray,
    setFpsData,

    addNewDefensiveAction,
    removeDefensiveAction,

    handleSubmit,
    handleReset,
    submitBtnValue,
  } = useDefensiveActionsSection();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className=" flex flex-col gap-2">
        <DefensiveActions
          fpsData={fpsData}
          categoryData={categoryData}
          serviceData={serviceData}
          handleChangeInArray={handleChangeInArray}
          setFpsData={setFpsData}
          addNewDefensiveAction={addNewDefensiveAction}
          removeDefensiveAction={removeDefensiveAction}
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

export default DefensiveActionsSection;
