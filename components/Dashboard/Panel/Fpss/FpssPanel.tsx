import React from "react";
import CustomPieChart from "../Chart/CustomPieChart";
import CustomAreaChart from "../Chart/CustomAreaChart";
import CustomBarChart from "../Chart/CustomBarChart";
import CustomPieChartLabel from "../Chart/CustomPieChartLabel";
import CustomLineChartLabel from "../Chart/CustomLineChartLabel";
import CustomRadarChartLegend from "../Chart/CustomRadarChartLegend";

const FpssPanel = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-6">
      {/* <div className="col-span-3 flex items-end">
        <CustomBarChart className="flex-1" />
      </div> */}
      <div className="col-span-2 flex items-center">
        <CustomAreaChart className="flex-1" />
      </div>
      <CustomPieChartLabel />
      <CustomRadarChartLegend />
      <CustomLineChartLabel />
      <CustomLineChartLabel />
    </div>
  );
};

export default FpssPanel;
