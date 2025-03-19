"use client";
// import { EmailNotificationsType } from "@/components/Account/Sections/EmailNotifications/useEmailNotifications";
import { Switch } from "@/components/ui/switch";

const CustomSwitch = ({
  title,
  checked,
  onChange,
  disabled,
  checkedColor,
  unCheckedColor,
  checkedValue,
  unCheckedValue,
  checkedBgColor,
  unCheckedBgColor,
}: {
  title: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  checkedColor?: string;
  unCheckedColor?: string;
  checkedValue?: string;
  unCheckedValue?: string;
  checkedBgColor?: string;
  unCheckedBgColor?: string;
}) => {
  return (
    <div className="w-full px-4 py-3 bg-grayscale-100 shadow-[0px_0px_2px] shadow-grayscale-500  rounded-md flex items-center">
      <h2 className=" text-xs font-medium text-greenAccent-900">{title}</h2>
      <Switch
        checked={checked}
        disabled={disabled}
        onClick={(e) => {
          onChange();
        }}
        className={`ml-4  ${
          checkedBgColor
            ? checkedBgColor
            : "data-[state=checked]:bg-redAccent-900"
        } ${
          unCheckedBgColor
            ? unCheckedBgColor
            : "data-[state=unchecked]:bg-greenAccent-600"
        } `}
      />
      <span
        className={`ml-2 text-xs font-semibold capitalize ${
          checked ? checkedColor : unCheckedColor
        } ${disabled && "opacity-80"}`}
      >
        ( {checked ? checkedValue : unCheckedValue} )
      </span>
    </div>
  );
};

export default CustomSwitch;
