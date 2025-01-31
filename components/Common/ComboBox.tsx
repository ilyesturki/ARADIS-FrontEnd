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

const ComboBox = ({
  label,
  selectedValue,
  onChange,
  data,
  className,
  name,
  disabled,
}: {
  label: string;
  selectedValue?: string;
  onChange?: (currentValue: string, name?: string) => void;
  // onChange?: (currentValue: string, name?: string) => void;
  data: { value: string; label: string }[];
  className?: string;
  name?: string;
  disabled?: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedValue || "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`py-6 w-full justify-between text-sm font-normal text-grayscale-800 shadow-[0px_0px_2px] shadow-grayscale-800 border-none rounded-md ${className}`}
        >
          {value
            ? data.find((e) => e.value === value)?.label
            : `Select ${label}...`}
          <ChevronsUpDown className="ml-2 h-5 w-4 shrink-0 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search data..." />
          <CommandList>
            <CommandEmpty>No {label} found.</CommandEmpty>
            <CommandGroup>
              {data.map((data) => (
                <CommandItem
                  key={data.value}
                  value={data.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    if (onChange) {
                      onChange(
                        currentValue === value ? "" : currentValue,
                        name
                      );
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === data.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {data.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
