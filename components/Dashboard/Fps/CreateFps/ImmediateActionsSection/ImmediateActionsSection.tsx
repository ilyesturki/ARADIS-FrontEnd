"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import useCreateFps from "./useImmediateActions";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage";

import CustomSelectImages from "@/components/Common/CustomInput/CustomSelectImages";
import CustomSwitch from "@/components/Common/CustomInput/CustomSwitch";
import CustomDateTimePicker from "@/components/Common/CustomInput/CustomDateTimePicker";
import CustomPicker from "@/components/Common/CustomInput/CustomPicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SortingResults from "./components/SortingResults";

const ImmediateActions = () => {
  const {
    fpsData,
    fpsQid,
    handleChange,
    addNewSortingResult,
    removeSortingResult,
    addNewImmediateAction,
    removeImmediateAction,
    handleAlertChange,
    categoryData,
    serviceData,
    handleCategoryChange,
    handleServiceChange,

    handleSubmit,
    handleReset,
  } = useCreateFps();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className=" flex flex-col gap-6">
        <CustomSwitch
          title="Y a-t-il un risque client ?"
          checked={false}
          onChange={() => {}}
        />
        <SortingResults
          sortingResults={fpsData.sortingResults || []}
          handleChange={handleChange}
          addNewSortingResult={addNewSortingResult}
          removeSortingResult={removeSortingResult}
          categoryData={categoryData}
          serviceData={serviceData}
          handleCategoryChange={handleCategoryChange}
          handleServiceChange={handleServiceChange}
        />
        <CustomTextArea
          value={fpsData.concludeFromSorting}
          onChange={handleChange}
          label="pourqoui"
          placeholder="Qu'est ce qu'on a appris du tri ?"
          name="pourqoui"
        />

        {/* <>
          <CustomTextArea
            value={fpsData.pourqoui}
            onChange={handleChange}
            label="pourqoui"
            placeholder="Qu'est ce qu'on a appris du tri ?"
            name="pourqoui"
          />
          <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
            <CustomSelect<
              | "Securite"
              | "Environnement"
              | "Qualite"
              | "TRS/Efficience"
              | "Maintenence"
              | "Autre"
            >
              label="departement"
              value={fpsData.type}
              onChange={handleTypeChange}
              data={typeData}
              textColor={typeColors.textColor}
              className={typeColors.className}
            />
            <CustomSelect<
              | "Securite"
              | "Environnement"
              | "Qualite"
              | "TRS/Efficience"
              | "Maintenence"
              | "Autre"
            >
              label="categorie"
              value={fpsData.type}
              onChange={handleTypeChange}
              data={typeData}
              textColor={typeColors.textColor}
              className={typeColors.className}
            />
          </div>
        </> */}
      </div>
      <div className=" flex flex-col gap-10">
        <CustomInput
          value={fpsQid}
          onChange={handleChange}
          label="qid"
          placeholder="qid"
          name="qid"
          copy
          disabled
        />
        <CustomPicker
          label="Alert"
          selectedData={fpsData.alert || []}
          handleChange={handleAlertChange}
          data={serviceData || []}
        />
        <CustomButtons
          mainButtonOnCLick={handleSubmit}
          secondaryButtonOnCLick={handleReset}
        />
      </div>
    </div>
  );
};

export default ImmediateActions;
