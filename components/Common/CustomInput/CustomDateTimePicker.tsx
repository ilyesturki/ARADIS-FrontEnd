import { DateTimeInput } from "@/components/ui/datetime-input";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { useState } from "react";

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
  const [value1, setValue] = useState<Date | undefined>(undefined);
  return (
    <div className=" flex gap-4 items-center">
      <div className="w-full pl-4 pr-2 bg-grayscale-100 shadow-[0px_0px_2px] shadow-greenAccent-900  rounded-md">
        <span className="text-[10px] font-semibold text-greenAccent-900 capitalize ">
          {label}
        </span>
        <div className="w-full flex flex-row gap-4">
          <DateTimePicker
            value={value1}
            onChange={setValue}
            use12HourFormat
            timePicker={{ hour: true, minute: true }}
            renderTrigger={({ open, value: value1, setOpen }) => (
              <DateTimeInput
                value={value1}
                onChange={(x) => !open && setValue(x)}
                format="dd/MM/yyyy hh:mm aa"
                disabled={open}
                onCalendarClick={() => setOpen(!open)}
              />
            )}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default CustomDateTimePicker;
