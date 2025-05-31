import { useState, ReactNode, useEffect, useRef } from "react";

type FloatingLabelInputProps = {
  name?: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  className?: string;
};

const CustomAuthInput: React.FC<FloatingLabelInputProps> = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  icon,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      setIsFocused(true);
    }
  }, [value]);

  useEffect(() => {
    const checkAutofill = () => {
      if (inputRef.current && inputRef.current.matches(":-webkit-autofill")) {
        setIsFocused(true);
      }
    };

    checkAutofill();
    const interval = setInterval(checkAutofill, 500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative flex items-center border-b-2 transition-all duration-300 ${
        isFocused
          ? "border-greenAccent-900"
          : "border-grayscale-500 border-opacity-40"
      } ${className}`}
    >
      {icon && (
        <div
          className={`text-grayscale-400 transition-all duration-300 ${
            isFocused || value
              ? "text-greenAccent-900"
              : "text-grayscale-500 text-opacity-40"
          }`}
        >
          {icon}
        </div>
      )}
      <div className="relative flex-1 ml-2">
        <label
          className={`absolute left-2 text-sm transition-all duration-300 pointer-events-none ${
            isFocused || value
              ? "-top-[6px] text-xs text-greenAccent-900"
              : "top-1/2 transform -translate-y-1/2 text-grayscale-500 text-opacity-90"
          }`}
        >
          {label}
        </label>
        <input
          ref={inputRef}
          type={type}
          name={name}
          className="w-full bg-transparent outline-none py-2 text-lg"
          onFocus={() => setIsFocused(true)}
          onBlur={() => !value && setIsFocused(false)}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default CustomAuthInput;
