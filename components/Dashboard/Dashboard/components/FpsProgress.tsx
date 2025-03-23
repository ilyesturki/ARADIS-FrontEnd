import { FaCheck } from "react-icons/fa";

import ProgressBox from "./ProgressBox";

const FpsProgress = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center px-4">
        <ProgressBox status="open">
          <FaCheck />
        </ProgressBox>
        <div className="w-[30px] h-[2px] bg-greenAccent-800 rounded-sm"></div>
        <ProgressBox status="inProgress">2</ProgressBox>
        <div className="w-[30px] h-[2px] bg-neutral-400 rounded-sm">
          <div className="w-4 h-[2px] bg-neutral-300 rounded-sm"></div>
        </div>
        <ProgressBox status="resolved">3</ProgressBox>
      </div>
      <div className="flex justify-between pl-4 pr-2">
        <span className="text-[10px] font-bold text-greenAccent-800">Open</span>
        <span className="ml-3 text-[10px] font-bold text-greenAccent-800">
          In progress
        </span>
        <span className="text-[10px] font-bold text-neutral-300">Resolved</span>
      </div>
    </div>
  );
};

export default FpsProgress;
