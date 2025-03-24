const FpsStatus = ({ type }: { type: string }) => {
  return (
    <span
      className={`
    block px-1.5 py-1  bg-opacity-10 text-[11px] font-semibold ${
      type === "Security"
        ? "bg-redAccent-800 text-redAccent-800 border-redAccent-800"
        : "bg-greenAccent-800 text-greenAccent-800 border-greenAccent-800"
    } border  rounded-md
    `}
    >
      {type}
    </span>
  );
};

export default FpsStatus;
