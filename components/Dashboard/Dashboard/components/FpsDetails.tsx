import React from "react";
import FpsHeader from "./FpsHeader";
import FpsProgress from "./FpsProgress";
import FpsDescription from "./FpsDescription";
import { FpsType } from "@/redux/fps/fpsSlice";
import CustomSelectImages from "@/components/Common/CustomInput/CustomSelectImages";

const FpsDetails = ({
  fps,
  dialogMode,
}: {
  fps: FpsType;
  dialogMode?: boolean;
}) => {
  return (
    <div className={`${dialogMode && "grid md:grid-cols-2 gap-2 py-1.5"}`}>
      <div className="w-full px-1">
        <FpsHeader
          fpsId={fps.fpsId}
          type={fps.problem.type}
          periority={fps.problem.clientRisk || fps.problem.type === "Securite"}
        />
        <hr className="border-neutral-200 my-3" />
        <FpsProgress status={fps.status} />
        <FpsDescription
          currentStep={fps.currentStep}
          ref={fps.problem.ref}
          where={fps.problem.ou}
          when={new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(fps.problem.quand))}
          userImage={fps.user?.image}
          fullName={`${fps.user?.firstName} ${fps.user?.lastName}`}
          clientRisk={fps.problem.clientRisk ? "True" : "False"}
          dialogMode={dialogMode}
        />
      </div>
      {dialogMode && (
        <div className="">
          <CustomSelectImages
            label="fps Images"
            imageCover={fps.problem.image || ""}
            images={fps.problem.images || []}
            disabled={true}
            viewOnly={true}
          />
        </div>
      )}
    </div>
  );
};

export default FpsDetails;
