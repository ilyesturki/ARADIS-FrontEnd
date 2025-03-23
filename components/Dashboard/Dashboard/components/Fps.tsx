import React from "react";
import FpsHeader from "./FpsHeader";
import Progress from "./Progress";

const Fps = () => {
  return (
    <div className="px-3 py-3 bg-neutral-50 border rounded-lg">
      <FpsHeader />
      <hr className="border-neutral-200 my-3" />
      <Progress />
    </div>
  );
};

export default Fps;
