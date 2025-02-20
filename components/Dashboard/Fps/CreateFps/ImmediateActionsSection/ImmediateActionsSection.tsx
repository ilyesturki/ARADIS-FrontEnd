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

const ImmediateActionsSection = () => {
  const {
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
  } = useImmediateActionsSection();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className=" flex flex-col gap-6">
        <CustomSwitch
          title="Faut-il lancer un tri ?"
          checked={fpsData.startSorting}
          onChange={handleStartSorting}
        />
        <SortingResults
          sortingResults={fpsData.sortingResults || []}
          addNewSortingResult={addNewSortingResult}
          removeSortingResult={removeSortingResult}
          categoryData={categoryData}
          serviceData={serviceData}
          handleChangeInArrayObject={handleChangeInArrayObject}
          setFpsData={setFpsData}
        />
        <CustomTextArea
          value={fpsData.concludeFromSorting}
          onChange={handleChange}
          label="Conclusion"
          placeholder="Qu'est ce qu'on a appris du tri ?"
          name="concludeFromSorting"
        />

        <ImmediateActions
          immediatActions={fpsData.immediatActions || []}
          handleChange={handleChange}
          addNewImmediateAction={addNewImmediateAction}
          removeImmediateAction={removeImmediateAction}
          categoryData={categoryData}
          serviceData={serviceData}
          handleChangeInArrayObject={handleChangeInArrayObject}
          setFpsData={setFpsData}
        />
      </div>
      <div className=" flex flex-col gap-10">
        <CustomInput
          value={fpsId}
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

export default ImmediateActionsSection;
