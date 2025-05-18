"use client";
const CustomTextArea = ({
  label,
  value,
  onChange,
  placeholder,
  name,
  children,
  disabled,
}: {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  name?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}) => {
  return (
    <div className=" flex gap-4 items-center">
      <div
        className={`w-full px-4 bg-grayscale-100 dark:bg-gray-900  dark:border-gray-700 border rounded-md ${
          disabled && "bg-opacity-50"
        }`}
      >
        <span className="text-[10px] font-semibold text-greenAccent-900 dark:text-gray-300 capitalize ">
          {label}
        </span>
        <textarea
          name={name}
          id=""
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className=" w-full h-16 min-h-12 py-2 text-sm font-normal placeholder-grayscale-500 dark:text-gray-300 dark:placeholder-gray-400 placeholder-opacity-70 bg-transparent outline-none"
        ></textarea>
      </div>
      {children}
    </div>
  );
};

export default CustomTextArea;
