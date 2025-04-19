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
import ActionsList from "@/components/Common/ActionsList/ActionsList";
import ActionBox from "@/components/Common/ActionsList/ActionBox";

const ImmediateActionsSection = () => {
  const t = useTranslations("CreateFps.immediateActions");
  const {
    fpsData,
    setFpsData,
    disabled,
    editSortingResult,
    removeSortingResult,
    editImmediateAction,
    removeImmediateAction,
    handleSubmit,
    handleReset,
    submitBtnValue,
    isAdminOrManager,
    isDone,
    fpsId,

    handleChange,
    handleStartSorting,
  } = useImmediateActionsSection();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className=" flex flex-col gap-6">
        <CustomSwitch
          title={t("switch.label")}
          checked={fpsData.startSorting}
          onChange={handleStartSorting}
          disabled={disabled}
          checkedColor="text-redAccent-900"
          unCheckedColor="text-greenAccent-900"
          checkedValue={t("switch.checkedValue")}
          unCheckedValue={t("switch.unCheckedValue")}
        />

        <SortingResults
          setFpsData={setFpsData}
          disabled={disabled}
          fpsData={fpsData}
        />

        <CustomSectionHeader title={t("conclusion.label")} />
        <CustomTextArea
          value={fpsData.concludeFromSorting}
          onChange={handleChange}
          label={t("conclusion.label")}
          placeholder={t("conclusion.placeholder")}
          name="concludeFromSorting"
          disabled={disabled}
        />

        <ImmediateActions
          setFpsData={setFpsData}
          disabled={disabled}
          fpsData={fpsData}
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
        <ActionsList headers={["Service", "Category", "Product", "Actions"]}>
          {fpsData?.sortingResults &&
            fpsData?.sortingResults?.length > 0 &&
            fpsData.sortingResults?.map((e, i) => {
              return (
                <ActionBox
                  key={i}
                  data={[e.userService, e.userCategory, e.product]}
                  editAction={editSortingResult}
                  removeAction={removeSortingResult}
                  i={i}
                  disabled={disabled}
                />
              );
            })}
        </ActionsList>
        <ActionsList
          headers={["Service", "Category", "description", "Actions"]}
        >
          {fpsData?.immediateActions &&
            fpsData?.immediateActions?.length > 0 &&
            fpsData.immediateActions?.map((e, i) => {
              return (
                <ActionBox
                  key={i}
                  data={[e.userService, e.userCategory, e.description]}
                  editAction={editImmediateAction}
                  removeAction={removeImmediateAction}
                  i={i}
                  disabled={disabled}
                />
              );
            })}
        </ActionsList>
        {/* <CustomPicker
          label={t("alert.label")}
          selectedData={fpsData.alert || []}
          handleChange={handleAlertChange}
          data={serviceData || []}
          disabled={disabled}
        /> */}
        {isDone ? (
          <CustomText title={t("doneStatus.done")} />
        ) : isAdminOrManager ? (
          <CustomText title={t("doneStatus.notAllowed")} />
        ) : disabled ? (
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
