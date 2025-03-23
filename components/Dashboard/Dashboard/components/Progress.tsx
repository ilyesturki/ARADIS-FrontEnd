import React from "react";
import ProgressBox from "./ProgressBox";

const Progress = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center px-4">
        <ProgressBox status="open">1</ProgressBox>
        <div className="w-7 h-[2px] bg-greenAccent-800 rounded-sm"></div>
        <ProgressBox status="inProgress">2</ProgressBox>
        <div className="w-7 h-[2px] bg-greenAccent-800 rounded-sm"></div>
        <ProgressBox status="resolved">3</ProgressBox>
      </div>
      <div className="flex justify-between pl-4 pr-2">
        <span className="text-[10px] font-semibold text-greenAccent-800">
          Open
        </span>
        <span className="ml-3 text-[10px] font-semibold text-greenAccent-800">
          In progress
        </span>
        <span className="text-[10px] font-semibold text-greenAccent-800">
          Resolved
        </span>
      </div>
    </div>
  );
};

export default Progress;
