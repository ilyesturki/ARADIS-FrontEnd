const CustomButtons = ({
  value,
  mainButtonOnCLick,
  secondaryButtonOnCLick,
}: {
  value?: string;
  mainButtonOnCLick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  secondaryButtonOnCLick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className=" w-full grid grid-cols-2 gap-3">
      <button
        onClick={mainButtonOnCLick}
        className=" py-2 px-6 bg-grayscale-500 rounded-md text-base font-medium text-white "
      >
        {value || "Save"}
      </button>
      <button
        onClick={secondaryButtonOnCLick}
        className=" py-2 px-6 bg-transparent rounded-md text-base font-medium text-grayscale-500 shadow-[0_0_2px] shadow-grayscale-500 hover:bg-grayscale-500 hover:bg-opacity-10 hover:text-opacity-90"
      >
        Reset
      </button>
    </div>
  );
};

export default CustomButtons;
