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

const CauseSection = () => {
  const {
    fpsData,
    fpsQid,
    addNewWhy,
    removeWhy,
    handleChange,
    causeData,
    handleCauseChange,
    handleSubmit,
    handleReset,
  } = useCauseSection();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className="flex flex-col gap-2">
        <WhyList
          whyList={fpsData.whyList}
          handleChange={handleChange}
          addNewWhy={addNewWhy}
          removeWhy={removeWhy}
        />
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
          label="Cause"
          selectedData={fpsData.causeList || []}
          handleChange={handleCauseChange}
          data={causeData || []}
        />
        <CustomButtons
          mainButtonOnCLick={handleSubmit}
          secondaryButtonOnCLick={handleReset}
        />
      </div>
    </div>
  );
};

export default CauseSection;
