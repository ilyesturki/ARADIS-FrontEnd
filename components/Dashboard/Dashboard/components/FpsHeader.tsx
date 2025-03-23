import React from "react";

const FpsHeader = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-medium text-greenAccent-900">
          FPS-M8BTD2OW-2VONG9DL
        </span>
        <span className="block px-2 py-1 bg-greenAccent-600 bg-opacity-10 text-xs text-greenAccent-600 border border-greenAccent-600 rounded-sm">
          Quality
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-neutral-500">
          Periority :
        </span>
        <span className="block px-2 py-1 bg-redAccent-900 bg-opacity-10 text-xs text-redAccent-900 rounded-sm">
          Urgent
        </span>
      </div>
    </div>
  );
};

export default FpsHeader;
