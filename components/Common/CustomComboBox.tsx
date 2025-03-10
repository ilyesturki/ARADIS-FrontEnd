"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CustomComboBox = ({
  label,
  data,
  className,
  selectedValue,
  onChange,
  style,
  disabled,
}: {
  label: string;
  data: { value: string; label: string }[];
  className?: string;
  selectedValue?: string;
  onChange?: (currentValue: string) => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(selectedValue || "");
  React.useEffect(() => {
    setValue(selectedValue || "");
  }, [selectedValue]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-expanded={open}
          className={`flex items-center justify-center w-full aspect-1 bg-greenAccent-900 shadow-[0_0_2.5px] shadow-grayscale-500 rounded-[5px] hover:opacity-60 ${className} ${
            disabled ? "cursor-not-allowed hover:opacity-90" : "cursor-pointer"
          }`}
          style={style}
          disabled={disabled}
        >
          {value ? (
            label !== "Colors" ? (
              <span className=" text-xs font-semibold text-white">
                {data.find((e) => e.value === value)?.label}
              </span>
            ) : null
          ) : (
            <FontAwesomeIcon icon={faPlus} className=" w-3 h-3 text-white " />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className=" w-full p-0">
        <Command>
          <CommandInput placeholder="Search data..." />
          <CommandList>
            <CommandEmpty>No {label} found.</CommandEmpty>
            <CommandGroup>
              {data.map((e) => (
                <CommandItem
                  key={e.value}
                  value={e.value}
                  onSelect={(currentValue) => {
                    setValue("");
                    setOpen(false);
                    onChange &&
                      onChange(currentValue === value ? "" : currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === e.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {e.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CustomComboBox;
