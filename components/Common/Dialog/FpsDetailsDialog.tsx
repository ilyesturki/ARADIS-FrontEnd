"use client";
import { FpsType } from "@/redux/fps/fpsSlice";
import Link from "next/link";

const FpsDetailsDialog = ({
  fps,
  isSelected,
}: {
  fps: FpsType;
  isSelected: boolean;
}) => {
  return (
    <Link
      href={`fps-panel/fps?fpsId=${fps.fpsId}`}
      className="flex justify-center items-center w-full py-2.5 bg-greenAccent-900 bg-opacity-80 text-base font-semibold text-grayscale-100 rounded-sm"
    >
      Show Fps
    </Link>
  );

};

export default FpsDetailsDialog;
