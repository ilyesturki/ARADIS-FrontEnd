"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import useValidationSection from "./useValidationSection";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage";

import CustomSelectImages from "@/components/Common/CustomInput/CustomSelectImages";
import CustomSwitch from "@/components/Common/CustomInput/CustomSwitch";
import CustomDateTimePicker from "@/components/Common/CustomInput/CustomDateTimePicker";
import CustomPicker from "@/components/Common/CustomInput/CustomPicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Comments from "./Comments";

const ValidationSection = () => {
  const {
    fpsData,
    setFpsData,
    fpsId,
    fpsCompleted,
    handleStatusChange,
    handleSubmit,
    handleReset,
    submitBtnValue,
  } = useValidationSection();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className="flex flex-col gap-2">
        <Comments
          comments={fpsData.comments || []}
          addNewComment={addNewComment}
          removeComment={removeComment}
          handleChangeComment={handleChangeComment}
          setFpsData={setFpsData}
        />
      </div>
      <div className=" flex flex-col gap-10">
        <CustomInput
          value={fpsId}
          label="fpsId"
          placeholder="fpsId"
          name="fpsId"
          copy
          disabled
        />
        <CustomSwitch
          title="Le FPS a-t-il été résolu avec succès ?"
          checked={fpsCompleted}
          onChange={handleStatusChange}
        />
        <CustomButtons
          value={submitBtnValue}
          mainButtonOnCLick={handleSubmit}
          secondaryButtonOnCLick={handleReset}
        />
      </div>
    </div>
  );
};

export default ValidationSection;
