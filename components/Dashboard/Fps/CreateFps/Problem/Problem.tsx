"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import useProblem from "./useProblem";
import CustomSelectImages from "@/components/Common/CustomInput/CustomSelectImages";
import CustomSwitch from "@/components/Common/CustomInput/CustomSwitch";
import CustomDateTimePicker from "@/components/Common/CustomInput/CustomDateTimePicker";
import CustomText from "@/components/Common/CustomInput/CustomText";
import { useTranslations } from "next-intl";

const Problem = () => {
  const t = useTranslations("CreateFps.problem");
  const {
    isAdminOrManager,
    isDisabled,
    isDone,
    problemTypesData,
    typeColors,
    handleTypeChange,
    fpsData,
    fpsId,
    handleChange,
    handleImageChange,
    customHandleChangeDate,
    customHandleChangeSelect,
    categoryData,
    serviceData,
    machineData,
    handleClientRisk,
    handleDeleteImages,

    handleSubmit,
    handleReset,
    submitBtnValue,
  } = useProblem();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className=" flex flex-col gap-6">
        <CustomSelect
          label={t("type.label")}
          value={fpsData.type}
          onChange={handleTypeChange}
          data={problemTypesData}
          textColor={typeColors.textColor}
          className={typeColors.className}
          name="type"
          disabled={isDisabled}
        />
        <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
          <CustomTextArea
            value={fpsData.quoi}
            onChange={handleChange}
            label={t("what.label")}
            placeholder={t("what.placeholder")}
            name="quoi"
            disabled={isDisabled}
          />
          <CustomTextArea
            value={fpsData.ref}
            onChange={handleChange}
            label={t("ref.label")}
            placeholder={t("ref.placeholder")}
            name="ref"
            disabled={isDisabled}
          />
        </div>
        <CustomDateTimePicker
          label={t("when.label")}
          value={fpsData.quand}
          name="quand"
          onChange={customHandleChangeDate}
          disabled={isDisabled}
        />
        <CustomSelect
          label="Machine"
          value={fpsData.machine}
          onChange={customHandleChangeSelect}
          data={machineData}
          name="machine"
          disabled={isDisabled}
        />
        <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
          <CustomInput
            value={fpsData.ou}
            onChange={handleChange}
            label={t("where.label")}
            placeholder={t("where.placeholder")}
            name="ou"
            disabled={isDisabled}
          />
          <CustomInput
            value={fpsData.combien}
            onChange={handleChange}
            label={t("howMany.label")}
            placeholder={t("howMany.placeholder")}
            name="combien"
            disabled={isDisabled}
          />
          <CustomSelect
            label={t("department.label")}
            value={fpsData.userService}
            data={serviceData}
            name="userService"
            disabled={true}
          />
          <CustomSelect
            label={t("category.label")}
            value={fpsData.userCategory}
            data={categoryData}
            name="userCategory"
            disabled={true}
          />
        </div>
        <CustomTextArea
          value={fpsData.comment}
          onChange={handleChange}
          label={t("how.label")}
          placeholder={t("how.placeholder")}
          name="comment"
          disabled={isDisabled}
        />

        <CustomTextArea
          value={fpsData.pourquoi}
          onChange={handleChange}
          label={t("why.label")}
          placeholder={t("why.placeholder")}
          name="pourquoi"
          disabled={isDisabled}
        />

        <CustomSwitch
          title={t("clientRisk.title")}
          checked={fpsData.clientRisk}
          onChange={handleClientRisk}
          disabled={isDisabled}
          checkedColor="text-redAccent-900"
          unCheckedColor="text-greenAccent-900"
          checkedValue={t("clientRisk.checkedValue")}
          unCheckedValue={t("clientRisk.unCheckedValue")}
        />
      </div>
      <div className=" flex flex-col gap-10">
        <div className=" flex flex-col gap-6">
          <CustomInput
            value={fpsId}
            label={t("fpsId.label")}
            placeholder={t("fpsId.placeholder")}
            name="fpsId"
            copy
            disabled
          />
          <CustomSelectImages
            label={t("fpsGallery.label")}
            imageCover={fpsData.image || ""}
            images={fpsData.images || []}
            handleImageChange={handleImageChange}
            handleDeleteImages={handleDeleteImages}
            disabled={isDisabled}
          />
        </div>
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

export default Problem;
