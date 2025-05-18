"use client";
import { TfiViewListAlt, TfiViewGrid } from "react-icons/tfi";
import FpssTable from "@/components/Dashboard/Panel/Fpss/FpssTable";
import { useState } from "react";
import FpssGrid from "@/components/Dashboard/Panel/Fpss/FpssGrid";

const FpsPanelPage = () => {
  const [view, setView] = useState<"list" | "grid">("list");
  return (
    <div className="">
      <div className="">
        <div className="ml-auto w-fit px-2 py-2">
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 bg-grayscale-500 ${
              view === "list" ? "bg-opacity-90" : "bg-opacity-60"
            } rounded-sm shadow-sm shadow-grayscale-300`}
          >
            <TfiViewListAlt className="text-md text-grayscale-100" />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`px-4 py-2 ml-1 bg-grayscale-500 ${
              view === "grid" ? "bg-opacity-90" : "bg-opacity-60"
            } rounded-sm`}
          >
            <TfiViewGrid className="text-md text-grayscale-100" />
          </button>
        </div>
      </div>
      {view === "list" ? <FpssTable /> : <FpssGrid />}
    </div>
  );
};

export default FpsPanelPage;
