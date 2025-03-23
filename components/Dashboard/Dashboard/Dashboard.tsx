import React from "react";
import Fps from "./components/Fps";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
      <Fps />
      <Fps />
      <Fps />
      <Fps />
    </div>
  );
};

export default Dashboard;
