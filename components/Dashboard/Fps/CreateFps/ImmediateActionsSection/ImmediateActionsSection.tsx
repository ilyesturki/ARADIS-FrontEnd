"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import useImmediateActionsSection from "./useImmediateActionsSection";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage";

import CustomSelectImages from "@/components/Common/CustomInput/CustomSelectImages";
import CustomSwitch from "@/components/Common/CustomInput/CustomSwitch";
import CustomDateTimePicker from "@/components/Common/CustomInput/CustomDateTimePicker";
import CustomPicker from "@/components/Common/CustomInput/CustomPicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SortingResults from "./components/SortingResults";
import ImmediateActions from "./components/ImmediateActions";
import CustomText from "@/components/Common/CustomInput/CustomText";
import CustomSectionHeader from "../../Common/CustomSectionHeader";
import { useTranslations } from "next-intl";

const ImmediateActionsSection = () => {
  const t = useTranslations("CreateFps.immediateActions");
  const {
    isAdminOrManager,
    currentStep,
    isDisabled,
    isDone,
    fpsData,
    fpsId,
    handleChange,
    addNewSortingResult,
    removeSortingResult,
    addNewImmediateAction,
    removeImmediateAction,
    handleAlertChange,
    categoryData,
    serviceData,
    handleChangeInArray,
    handleChangeInArrayObject,
    setFpsData,
    handleStartSorting,

    handleSubmit,
    handleReset,
    submitBtnValue,
  } = useImmediateActionsSection();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className=" flex flex-col gap-6">
        <CustomSwitch
          title={t("switch.label")}
          checked={fpsData.startSorting}
          onChange={handleStartSorting}
          disabled={isDisabled}
          checkedColor="text-redAccent-900"
          unCheckedColor="text-greenAccent-900"
          checkedValue={t("switch.checkedValue")}
          unCheckedValue={t("switch.unCheckedValue")}
        />
        <SortingResults
          sortingResults={fpsData.sortingResults || []}
          addNewSortingResult={addNewSortingResult}
          removeSortingResult={removeSortingResult}
          categoryData={categoryData}
          serviceData={serviceData}
          handleChangeInArrayObject={handleChangeInArrayObject}
          setFpsData={setFpsData}
          disabled={isDisabled}
        />
        <CustomSectionHeader title={t("conclusion.label")} />
        <CustomTextArea
          value={fpsData.concludeFromSorting}
          onChange={handleChange}
          label={t("conclusion.label")}
          placeholder={t("conclusion.placeholder")}
          name="concludeFromSorting"
          disabled={isDisabled}
        />

        <ImmediateActions
          immediateActions={fpsData.immediateActions || []}
          handleChange={handleChange}
          addNewImmediateAction={addNewImmediateAction}
          removeImmediateAction={removeImmediateAction}
          categoryData={categoryData}
          serviceData={serviceData}
          handleChangeInArrayObject={handleChangeInArrayObject}
          setFpsData={setFpsData}
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
          label={t("alert.label")}
          selectedData={fpsData.alert || []}
          handleChange={handleAlertChange}
          data={serviceData || []}
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

export default ImmediateActionsSection;
