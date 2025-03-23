import React from "react";
import FpsHeader from "./FpsHeader";
import Progress from "./FpsProgress";
import FpsDescription from "./FpsDescription";
import FpsProgress from "./FpsProgress";
import DetailsButton from "./DetailsButton";
import { FpsType } from "@/redux/fps/fpsSlice";

const Fps = ({ fps }: { fps: FpsType }) => {
  return (
    <div className="px-3 py-3 bg-grayscale-100 border rounded-md">
      <FpsHeader
        fpsId={fps.fpsId}
        type={fps.problem.type}
        periority={fps.problem.clientRisk || fps.problem.type === "Securite"}
      />
      <hr className="border-neutral-200 my-3" />
      <FpsProgress />
      <FpsDescription />
      <DetailsButton />
    </div>
  );
};

export default Fps;
