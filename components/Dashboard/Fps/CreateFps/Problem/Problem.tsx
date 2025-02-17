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

const Problem = () => {
  const {
    problemTypesData,
    typeColors,
    handleTypeChange,
    fpsData,
    fpsQid,
    handleChange,
    handleImageChange,
    customHandleChangeSelect,
    customHandleChangeDate,
    categoryData,
    serviceData,
    handleClientRisk,

    handleSubmit,
    handleReset,
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
        />
        <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
          <CustomTextArea
            value={fpsData.quoi}
            onChange={handleChange}
            label="quoi"
            placeholder="Quel est le probleme ?"
            name="quoi"
          />
          <CustomTextArea
            value={fpsData.ref}
            onChange={handleChange}
            label="ref"
            placeholder="Quelle reference ?"
            name="ref"
          />
        </div>
        <CustomDateTimePicker
          label="Quand"
          value={fpsData.quand}
          name="quand"
          onChange={customHandleChangeDate}
        />
        <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
          <CustomInput
            value={fpsData.ou}
            onChange={handleChange}
            label="ou"
            placeholder="A-t-il detecte ?"
            name="ou"
          />
          <CustomInput
            value={fpsData.combien}
            onChange={handleChange}
            label="combien"
            placeholder="De pieces ? Pertes ?"
            name="combien"
          />
          <CustomSelect
            label="departement"
            value={fpsData.userService}
            onChange={customHandleChangeSelect}
            data={serviceData}
            name="userService"
          />
          <CustomSelect
            label="categorie"
            value={fpsData.userService}
            onChange={customHandleChangeSelect}
            data={categoryData}
            name="userCategory"
          />
        </div>
        <CustomTextArea
          value={fpsData.comment}
          onChange={handleChange}
          label="comment"
          placeholder="A-t-il detecte ?"
          name="comment"
        />

        <CustomTextArea
          value={fpsData.pourqoui}
          onChange={handleChange}
          label="pourqoui"
          placeholder="Est-ce un probleme ?"
          name="pourqoui"
        />

        <CustomSwitch
          title="Y a-t-il un risque client ?"
          checked={fpsData.clientRisck}
          onChange={handleClientRisk}
        />
      </div>
      <div className=" flex flex-col gap-10">
        <div className=" flex flex-col gap-6">
          <CustomInput
            value={fpsQid}
            onChange={handleChange}
            label="qid"
            placeholder="qid"
            name="qid"
            copy
            disabled
          />
          <CustomSelectImages
            label="Fps Gallery"
            imageCover={fpsData.image || ""}
            images={fpsData.images || []}
            handleImageChange={handleImageChange}
          />
        </div>
        <CustomButtons
          mainButtonOnCLick={handleSubmit}
          secondaryButtonOnCLick={handleReset}
        />
      </div>
    </div>
  );
};

export default Problem;
