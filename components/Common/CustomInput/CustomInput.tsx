"use client";

import CopyButton from "../CopyButton";

const CustomInput = ({
  label,
  value,
  placeholder,
  name,
  onChange,
  children,
  disabled,
  copy,
}: {
  label: string;
  value?: string | number;
  placeholder: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  copy?: boolean;
}) => {
  return (
    <div className=" w-full flex gap-4 items-center">
      <div className=" w-full px-4 bg-grayscale-100 shadow-[0px_0px_2px] shadow-greenAccent-900  rounded-md">
        <span className=" w-full text-[10px] font-semibold text-greenAccent-900 capitalize ">
          {label}
          {copy && <CopyButton data={value || ""} />}
        </span>

        {/* </div> */}

        <input
          type="text"
          name={name}
          id=""
          value={value ? value.toString() : ""}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          className={` w-full py-2 bg-transparent  text-sm font-medium text-grayscale-600 placeholder-greenAccent-900 placeholder-opacity-70 outline-none ${
            disabled && " text-opacity-50"
          }`}
        />
      </div>
      {children}
    </div>
  );
};

export default CustomInput;
