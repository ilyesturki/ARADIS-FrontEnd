"use client";
import CustomComboBox from "../CustomComboBox";

const CustomSelectedPicker = ({
  label,
  data,
  handleChange,
  i,
  el,
}: {
  label: string;
  data: { value: string; label: string }[];
  handleChange: (data: string, i?: number) => void;
  i?: number;
  el: string;
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
        className="px-6 h-10 bg-opacity-70"
      />
    </div>
  );
};

export default CustomSelectedPicker;
