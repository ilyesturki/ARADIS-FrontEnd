import { DateTimeInput } from "@/components/ui/datetime-input";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { useState } from "react";
import { TZDate } from "react-day-picker";

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
  onChange?: (date: Date | undefined, name?: string) => void;
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
        <div className="w-full flex flex-row gap-4">
          <DateTimePicker
            value={value ? new TZDate(value) : undefined}
            onChange={(date) => {
              onChange?.(date, name);
            }}
            use12HourFormat
            timePicker={{ hour: true, minute: true }}
            renderTrigger={({ open, value: data, setOpen }) => (
              <DateTimeInput
                value={value ? new TZDate(value) : undefined}
                onChange={(date) => !open && onChange?.(date, name)}
                format="dd/MM/yyyy hh:mm aa"
                disabled={open}
                onCalendarClick={() => setOpen(!open)}
                timezone="Europe/Paris"
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
