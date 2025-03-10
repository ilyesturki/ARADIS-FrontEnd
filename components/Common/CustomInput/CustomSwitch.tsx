"use client";
// import { EmailNotificationsType } from "@/components/Account/Sections/EmailNotifications/useEmailNotifications";
import { Switch } from "@/components/ui/switch";

const CustomSwitch = ({
  title,
  checked,
  onChange,
  disabled,
}: {
  title: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) => {
  return (
    <div className="w-full px-4 py-3 bg-grayscale-100 shadow-[0px_0px_2px] shadow-grayscale-500  rounded-md flex items-center">
      <h2 className=" text-sm font-medium text-greenAccent-900">{title}</h2>
      <Switch
        checked={checked}
        disabled={disabled}
        onClick={(e) => {
          onChange();
        }}
        className={`ml-4 data-[state=checked]:bg-redAccent-900 data-[state=unchecked]:bg-greenAccent-800`}
      />
      <span
        className={`ml-2 text-xs font-semibold capitalize ${
          checked ? "text-redAccent-900" : "text-greenAccent-800"
        } ${disabled && "opacity-80"}`}
      >
        ( {checked ? "Oui" : "Non"} )
      </span>
    </div>
  );
};

export default CustomSwitch;
