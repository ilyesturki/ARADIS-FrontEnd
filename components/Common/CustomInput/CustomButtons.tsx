"use client";
const CustomButtons = ({
  value,
  mainButtonOnCLick,
  secondaryButtonOnCLick,
  mainButtonText ,
  secondaryButtonText,
}: {
  value?: string;
  mainButtonOnCLick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  secondaryButtonOnCLick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  mainButtonText?: string;
  secondaryButtonText: string;
}) => {
  return (
    <div className=" w-full grid grid-cols-2 gap-3">
      <button
        onClick={mainButtonOnCLick}
        className=" py-2 px-6 bg-greenAccent-900 rounded-md text-base font-medium text-white "
      >
        {value || mainButtonText || "save"}
      </button>
      <button
        onClick={secondaryButtonOnCLick}
        className=" py-2 px-6 bg-transparent rounded-md text-base font-medium text-greenAccent-900 shadow-[0_0_2px] shadow-greenAccent-900 hover:bg-greenAccent-900 hover:bg-opacity-10 hover:text-opacity-90"
      >
        {secondaryButtonText}
      </button>
    </div>
  );
};

export default CustomButtons;
