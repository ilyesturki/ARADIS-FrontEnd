import {DatePicker} from "@heroui/react";
import {now, getLocalTimeZone} from "@internationalized/date";

const CustomDateTimePicker = ({
    label,
    value,
    onChange,
    name,
    children,
    disabled,
  }: {
    label: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name?: string;
    children?: React.ReactNode;
    disabled?: boolean;
  }) => {
  return (
    <div className=" flex gap-4 items-center">
    <div className="w-full pl-4 pr-2 bg-grayscale-100 shadow-[0px_0px_2px] shadow-greenAccent-900  rounded-md">
      <span className="text-[10px] font-semibold text-greenAccent-900 capitalize ">
        {label}
      </span>
      <div className="w-full max-w-xl flex flex-row gap-4">
  <DatePicker
    hideTimeZone
    showMonthAndYearPickers
    defaultValue={now(getLocalTimeZone())}
    
    className="text-greenAccent-900"
  />
</div>
    </div>
    {children}
  </div>
  
  
  
    
  )
}

export default CustomDateTimePicker