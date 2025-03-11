"use client";
import CreateFps from "@/components/Dashboard/Fps/CreateFps/CreateFps";
import { useAppSelector } from "@/redux/hooks";
import { LogOut } from "lucide-react";
import Link from "next/link";

const FpsPanelHeader = () => {
  const fps = useAppSelector((state) => state.fpss.fps);
  console.log(fps);
  return (
    <div className="flex justify-between px-3 py-2">
      <Link
        href="/dashboard/panel/fps-panel"
        className="w-7 h-7 flex justify-center items-center text-base font-semibold text-grayscale-100 bg-greenAccent-900 bg-opacity-80 hover:bg-opacity-70 rounded-lg shadow-[0_0_2px] shadow-grayscale-500"
      >
        <LogOut className=" w-3.5 h-3.5 rotate-180" />
      </Link>

      <div
        className={`px-3 rounded-full shadow-[0_0_5px] ${
          fps?.status === "completed"
            ? "bg-greenAccent-800 shadow-greenAccent-800"
            : fps?.status === "failed"
            ? "bg-redAccent-800 shadow-redAccent-800"
            : "bg-orangeAccent shadow-orangeAccent"
        }`}
      >
        <span className="text-[10px] font-bold uppercase text-grayscale-100">
          {fps?.status}
        </span>
      </div>
    </div>
  );
};

export default FpsPanelHeader;
