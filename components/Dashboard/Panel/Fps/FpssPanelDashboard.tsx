import React from "react";
import CustomPieChart from "../Chart/CustomPieChart";

const FpssPanelDashboard = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-6">
      <CustomPieChart />
      <CustomPieChart />
      <CustomPieChart />
      <CustomPieChart />
      <CustomPieChart />
      <CustomPieChart />
    </div>
  );
};

export default FpssPanelDashboard;
