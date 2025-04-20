import React from "react";
import { FpsType } from "@/redux/fps/fpsSlice";
import FpsDetails from "./FpsDetails";
import FpsDetailsDialog from "@/components/Common/Dialog/FpsDetailsDialog";

const Fps = ({
  fps,
  isSelected = false,
}: {
  fps: FpsType;
  isSelected?: boolean;
}) => {
  return (
    <div className="px-3 py-3 bg-grayscale-100 border rounded-md">
      <FpsDetails fps={fps} />
      <FpsDetailsDialog fps={fps} isSelected={isSelected} />
    </div>
  );
};

export default Fps;
