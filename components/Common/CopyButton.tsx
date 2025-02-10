"use client";
const CopyButton = ({ data }: { data: string | number }) => {
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText(data.toString())}
      className=" mx-2 mt-0.5 px-1.5 py-0.5 text-[10px] capitalize text-grayscale-100 font-medium bg-greenAccent-900 opacity-90 hover:opacity-70 rounded-full shadow-[0_0_2px] shadow-greenAccent-900 "
    >
      copy
    </button>
  );
};

export default CopyButton;
