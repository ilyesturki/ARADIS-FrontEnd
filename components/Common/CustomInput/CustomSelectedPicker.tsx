"use client";
import CustomComboBox from "../CustomComboBox";

const CustomSelectedPicker = ({
  label,
  data,
  handleChange,
  i,
  el,
  disabled,
}: {
  label: string;
  data: { value: string; label: string }[];
  handleChange: (data: string, i?: number) => void;
  i?: number;
  el: string;
  disabled?: boolean;
}) => {
  const style =
    label === "Colors" && el ? { backgroundColor: el, outlineColor: el } : {};
  return (
    <div className=" flex flex-col gap-2 ">
      <CustomComboBox
        label={label}
        data={data}
        selectedValue={el}
        onChange={(s) => handleChange(s, i)}
        style={style}
        className="px-6 h-8 bg-opacity-70 capitalize"
        disabled={disabled}
      />
    </div>
  );
};

export default CustomSelectedPicker;
