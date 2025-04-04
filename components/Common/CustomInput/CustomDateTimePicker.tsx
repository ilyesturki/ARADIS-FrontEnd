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
      <div
        className={`w-full px-4 bg-grayscale-100 border rounded-md ${
          disabled && "bg-opacity-50"
        }`}
      >
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
                disabled={disabled ? disabled : open}
                onCalendarClick={() => {
                  disabled ? setOpen(false) : setOpen(!open);
                }}
                timezone="Europe/Paris"
                className={disabled ? `opacity-90` : ""}
              />
            )}
            disabled={disabled}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default CustomDateTimePicker;
