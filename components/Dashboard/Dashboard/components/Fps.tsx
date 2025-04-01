import React from "react";
import FpsHeader from "./FpsHeader";
import Progress from "./FpsProgress";
import FpsDescription from "./FpsDescription";
import FpsProgress from "./FpsProgress";
import DetailsButton from "./DetailsButton";
import { FpsType } from "@/redux/fps/fpsSlice";
import FpsDetails from "./FpsDetails";
import FpsDetailsDialog from "@/components/Common/Dialog/FpsDetailsDialog";

const Fps = ({ fps, isSelected }: { fps: FpsType; isSelected: boolean }) => {
  return (
    <div className="px-3 py-3 bg-grayscale-100 border rounded-md">
      <FpsDetails fps={fps} />
      <FpsDetailsDialog fps={fps} isSelected={isSelected} />
    </div>
  );
};

export default Fps;
