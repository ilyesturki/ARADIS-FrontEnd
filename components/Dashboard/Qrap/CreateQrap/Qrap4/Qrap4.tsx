"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import useCreateQrap from "./useQrap4";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage";

import CustomSelectImages from "@/components/Common/CustomInput/CustomSelectImages";
import CustomSwitch from "@/components/Common/CustomInput/CustomSwitch";
import CustomDateTimePicker from "@/components/Common/CustomInput/CustomDateTimePicker";
import CustomPicker from "@/components/Common/CustomInput/CustomPicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DefensiveActions from "../../Common/DefensiveActions/DefensiveActions";

const Qrap4 = () => {
  const {
    qrapData,
    qrapQid,
    handleChange,
    categoryData,
    serviceData,
    handleCategoryChange,
    handleServiceChange,
    addNewDefensiveAction,
    removeDefensiveAction,

    handleSubmit,
    handleReset,
  } = useCreateQrap();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className=" flex flex-col gap-2">
        <DefensiveActions
          qrapData={qrapData}
          handleChange={handleChange}
          categoryData={categoryData}
          serviceData={serviceData}
          handleCategoryChange={handleCategoryChange}
          handleServiceChange={handleServiceChange}
          addNewDefensiveAction={addNewDefensiveAction}
          removeDefensiveAction={removeDefensiveAction}
        />
      </div>
      <div className=" flex flex-col gap-10">
        <CustomInput
          value={qrapQid}
          onChange={handleChange}
          label="qid"
          placeholder="qid"
          name="qid"
          copy
          disabled
        />
        <CustomButtons
          mainButtonOnCLick={handleSubmit}
          secondaryButtonOnCLick={handleReset}
        />
      </div>
    </div>
  );
};

export default Qrap4;
