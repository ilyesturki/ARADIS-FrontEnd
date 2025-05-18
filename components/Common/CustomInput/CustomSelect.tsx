"use client";
import ComboBox from "@/components/Common/ComboBox";

const CustomSelect = <T,>({
  label,
  value,
  onChange,
  data = [],
  name,
  children,
  disabled,
  textColor,
  className,
}: {
  label: string;
  value?: string;
  onChange?: (currentValue: T, name?: string) => void;
  // onChange?: (currentValue: string, name?: string) => void;
  name?: string;
  data?: { value: string; label: string }[];
  children?: React.ReactNode;
  disabled?: boolean;
  textColor?: string;
  className?: string;
}) => {
  console.log(value);
  console.log(textColor);
  console.log(className);
  return (
    <div className=" flex gap-4 items-center">
      <div
        className={`bg-grayscale-100 pb-2 w-full pl-4 pr-2 border dark:bg-gray-900  dark:border-gray-700 rounded-md ${
          disabled ? "bg-opacity-50 cursor-not-allowed" : ""
        } ${className}`}
      >
        <span
          className={`text-[10px] font-semibold capitalize text-greenAccent-900 dark:text-gray-300 ${textColor}`}
        >
          {label}
        </span>
        <ComboBox
          label={label}
          data={data}
          selectedValue={value}
          onChange={(e: string, name?: string) => {
            // e is now of type T
            if (onChange) {
              if (name) {
                onChange(e as T, name);
              } else {
                onChange(e as T);
              }
            }
          }}
          textColor={textColor}
          name={name}
          disabled={disabled}
          className="bg-transparent shadow-none text-greenAccent-900 dark:text-gray-300 opacity-70"
        />
      </div>
      {children}
    </div>
  );
};

export default CustomSelect;
