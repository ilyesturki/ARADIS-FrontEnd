"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import useFps3 from "./useFps3";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage";

import CustomSelectImages from "@/components/Common/CustomInput/CustomSelectImages";
import CustomSwitch from "@/components/Common/CustomInput/CustomSwitch";
import CustomDateTimePicker from "@/components/Common/CustomInput/CustomDateTimePicker";
import CustomPicker from "@/components/Common/CustomInput/CustomPicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Fps3 = () => {
  const {
    usersData,
    handleUsersChange,

    typeData,
    typeColors,
    handleTypeChange,
    fpsData,

    handleChange,
    handleImageChange,
    handleSubmit,
    handleReset,
  } = useFps3();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className=" flex flex-col gap-6">
        <CustomInput
          value={fpsData.qid}
          onChange={handleChange}
          label="qid"
          placeholder="qid"
          name="qid"
          copy
          disabled
        />

        <CustomTextArea
          value={fpsData.pourqoui}
          onChange={handleChange}
          label="pourqoui"
          placeholder="Qu'est ce qu'on a appris du tri ?"
          name="pourqoui"
        />
        <hr className="w-full border-greenAccent-900 opacity-60" />
        <CustomTextArea
          value={fpsData.pourqoui}
          onChange={handleChange}
          label="pourqoui"
          placeholder="Qu'est ce qu'on a appris du tri ?"
          name="pourqoui"
        />
        <div className="flex items-center justify-between py-1">
          <hr className="w-5/12 border-greenAccent-900 opacity-60" />
          <div className="flex justify-center items-center w-7 aspect-1 rounded-full bg-greenAccent-900 opacity-80 shadow-[0_0_5px] shadow-greenAccent-900">
            <FontAwesomeIcon
              icon={faPlus}
              className="text-sm text-grayscale-100"
            />
          </div>

          <hr className=" w-5/12 border-greenAccent-900 opacity-60" />
        </div>
      </div>
      <div className=" flex flex-col gap-10">
        <CustomPicker
          label="Users"
          selectedData={fpsData.users || []}
          handleChange={handleUsersChange}
          data={usersData || []}
        />
        <CustomButtons
          mainButtonOnCLick={handleSubmit}
          secondaryButtonOnCLick={handleReset}
        />
      </div>
    </div>
  );
};

export default Fps3;
