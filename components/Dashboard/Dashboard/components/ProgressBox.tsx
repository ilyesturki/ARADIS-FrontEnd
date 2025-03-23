import React from "react";

const ProgressBox = ({
  status,
  children,
}: {
  status: "open" | "inProgress" | "resolved";
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`w-8 h-8 flex justify-center items-center ${
        status === "open"
          ? "bg-greenAccent-800"
          : status === "inProgress"
          ? "border-2 border-greenAccent-800"
          : "bg-neutral-300"
      } rounded-full`}
    >
      <span
        className={`text-base ${
          status === "inProgress"
            ? "text-greenAccent-800"
            : "text-grayscale-100"
        }  font-bold`}
      >
        {children}
      </span>
    </div>
  );
};

export default ProgressBox;
