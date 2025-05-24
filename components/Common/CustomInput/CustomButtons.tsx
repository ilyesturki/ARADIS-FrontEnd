"use client";
const CustomButtons = ({
  value,
  mainButtonOnCLick,
  secondaryButtonOnCLick,
  mainButtonText,
  secondaryButtonText,
  isLoading,
}: {
  value?: string;
  mainButtonOnCLick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  secondaryButtonOnCLick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  mainButtonText?: string;
  secondaryButtonText: string;
  isLoading?: boolean;
}) => {
  return (
    <div className=" w-full grid grid-cols-2 gap-3">
      <button
        disabled={isLoading}
        onClick={mainButtonOnCLick}
        className={`py-2 px-6 bg-greenAccent-900 rounded-md text-base font-medium text-white ${
          isLoading ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {value || mainButtonText}
      </button>
      <button
        disabled={isLoading}
        onClick={secondaryButtonOnCLick}
        className={`py-2 px-6 bg-transparent rounded-md text-base font-medium dark:font-semibold text-greenAccent-900 shadow-[0_0_2px] shadow-greenAccent-900 hover:bg-greenAccent-900 hover:bg-opacity-10 hover:text-opacity-90 dark:border dark:border-greenAccent-900 ${
          isLoading ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {secondaryButtonText}
      </button>
    </div>
  );
};

export default CustomButtons;
