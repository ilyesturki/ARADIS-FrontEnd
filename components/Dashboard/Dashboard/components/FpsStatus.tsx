const FpsStatus = ({ type }: { type: string }) => {
  return (
    <span className="block px-1.5 py-1 bg-greenAccent-800 bg-opacity-10 text-[11px] font-semibold text-greenAccent-800 border border-greenAccent-800 rounded-md">
      {type}
    </span>
  );
};

export default FpsStatus;
