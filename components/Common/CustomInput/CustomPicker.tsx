"use client";

import { useState } from "react";
import CustomComboBox from "../CustomComboBox";
import CustomSelectedPicker from "./CustomSelectedPicker";

const CustomPicker = ({
  label,
  selectedData,
  handleChange,
  data,
}: {
  label: string;
  selectedData: string[];
  handleChange: (data: string, i?: number) => void;
  data: { value: string; label: string }[];
}) => {
  const handlePickerOpen = (s: string) => {
    if (selectedData?.every((e) => e !== s)) {
      handleChange(s);
    }
  };

  console.log(data);

  return (
    <div className="w-full px-4 bg-grayscale-100 shadow-[0px_0px_2px] shadow-grayscale-500  rounded-md">
      <span className=" w-full text-[10px] font-semibold text-greenAccent-900 capitalize ">
        {label}
      </span>
      <div className="relative flex flex-wrap gap-x-3 gap-y-4 py-4">
        {selectedData?.map((e, i) => (
          <CustomSelectedPicker
            label={label}
            key={i}
            data={data}
            i={i}
            handleChange={handleChange}
            el={e}
          />
        ))}
        <div className="w-8">
          <CustomComboBox
            label={label}
            data={data}
            onChange={(s) => handlePickerOpen(s)}
            className="bg-opacity-70"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomPicker;
