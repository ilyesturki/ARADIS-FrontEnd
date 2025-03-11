import React from "react";
import CustomPieChart from "../Chart/CustomPieChart";
import CustomAreaChart from "../Chart/CustomAreaChart";
import CustomBarChart from "../Chart/CustomBarChart";
import CustomPieChartLabel from "../Chart/CustomPieChartLabel";

const FpssPanelDashboard = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-6">
      <div className="col-span-3">
        <CustomBarChart />
      </div>
      <div className="col-span-2 flex items-center">
        <CustomAreaChart className="flex-1" />
      </div>
      <CustomPieChartLabel />
      <CustomPieChart />
      <CustomPieChart />
      <CustomPieChart />
    </div>
  );
};

export default FpssPanelDashboard;
