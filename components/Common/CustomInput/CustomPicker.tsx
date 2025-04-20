"use client";

import CustomComboBox from "../CustomComboBox";
import CustomSelectedPicker from "./CustomSelectedPicker";

const CustomPicker = ({
  label,
  selectedData,
  handleChange,
  data,
  disabled
}: {
  label: string;
  selectedData: string[];
  handleChange: (data: string, i?: number) => void;
  data: { value: string; label: string }[];
  disabled?: boolean;
}) => {
  const handlePickerOpen = (s: string) => {
    if (selectedData?.every((e) => e !== s)) {
      handleChange(s);
    }
  };

  console.log(data);

  return (
    <div className={`w-full px-4 bg-grayscale-100 border rounded-md ${
      disabled && "bg-opacity-50"
    }`}>
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
            disabled={disabled}
          />
        ))}
        <div className="w-8">
          <CustomComboBox
            label={label}
            data={data}
            onChange={(s) => handlePickerOpen(s)}
            className="bg-opacity-70"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomPicker;
