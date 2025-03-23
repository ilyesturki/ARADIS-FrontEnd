"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import useProblem from "./useProblem";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage"; 

import CustomSelectImages from "@/components/Common/CustomInput/CustomSelectImages";
import CustomSwitch from "@/components/Common/CustomInput/CustomSwitch";
import CustomDateTimePicker from "@/components/Common/CustomInput/CustomDateTimePicker";
import CustomText from "@/components/Common/CustomInput/CustomText";

const Problem = () => {
  const {
    isAdminOrManager,
    currentStep,
    isDisabled,
    isDone,
    problemTypesData,
    typeColors,
    handleTypeChange,
    fpsData,
    fpsId,
    handleChange,
    handleImageChange,
    customHandleChangeSelect,
    customHandleChangeDate,
    categoryData,
    serviceData,
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
          label="Type"
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
            label="quoi"
            placeholder="Quel est le probleme ?"
            name="quoi"
            disabled={isDisabled}
          />
          <CustomTextArea
            value={fpsData.ref}
            onChange={handleChange}
            label="ref"
            placeholder="Quelle reference ?"
            name="ref"
            disabled={isDisabled}
          />
        </div>
        <CustomDateTimePicker
          label="Quand"
          value={fpsData.quand}
          name="quand"
          onChange={customHandleChangeDate}
          disabled={isDisabled}
        />
        <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
          <CustomInput
            value={fpsData.ou}
            onChange={handleChange}
            label="ou"
            placeholder="A-t-il detecte ?"
            name="ou"
            disabled={isDisabled}
          />
          <CustomInput
            value={fpsData.combien}
            onChange={handleChange}
            label="combien"
            placeholder="De pieces ? Pertes ?"
            name="combien"
            disabled={isDisabled}
          />
          <CustomSelect
            label="departement"
            value={fpsData.userService}
            onChange={customHandleChangeSelect}
            data={serviceData}
            name="userService"
            disabled={isDisabled}
          />
          <CustomSelect
            label="categorie"
            value={fpsData.userCategory}
            onChange={customHandleChangeSelect}
            data={categoryData}
            name="userCategory"
            disabled={isDisabled}
          />
        </div>
        <CustomTextArea
          value={fpsData.comment}
          onChange={handleChange}
          label="comment"
          placeholder="A-t-il detecte ?"
          name="comment"
          disabled={isDisabled}
        />

        <CustomTextArea
          value={fpsData.pourquoi}
          onChange={handleChange}
          label="pourquoi"
          placeholder="Est-ce un probleme ?"
          name="pourquoi"
          disabled={isDisabled}
        />

        <CustomSwitch
          title="Y a-t-il un risque client ?"
          checked={fpsData.clientRisk}
          onChange={handleClientRisk}
          disabled={isDisabled}
          checkedColor="text-redAccent-900"
          unCheckedColor="text-greenAccent-900"
          checkedValue="Oui"
          unCheckedValue="Non"
        />
      </div>
      <div className=" flex flex-col gap-10">
        <div className=" flex flex-col gap-6">
          <CustomInput
            value={fpsId}
            label="fpsId"
            placeholder="fpsId"
            name="fpsId"
            copy
            disabled
          />
          <CustomSelectImages
            label="Fps Gallery"
            imageCover={fpsData.image || ""}
            images={fpsData.images || []}
            handleImageChange={handleImageChange}
            handleDeleteImages={handleDeleteImages}
            disabled={isDisabled}
          />
        </div>
        {isDone ? (
          <CustomText title="This fps is done" />
        ) : isAdminOrManager ? (
          <CustomText title="Your not allowed to edit this fps" />
        ) : isDisabled ? (
          <CustomText title="You have to do all the previous steps" />
        ) : (
          <CustomButtons

            value={submitBtnValue}
            mainButtonOnCLick={handleSubmit}
            secondaryButtonOnCLick={handleReset}
            mainButtonText="Enregistrer"
            secondaryButtonText="Réinitialiser"
          />
        )}
      </div>
    </div>
  );
};

export default Problem;
