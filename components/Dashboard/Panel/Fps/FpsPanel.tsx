"use client";
import UsersPanel from "@/components/Dashboard/User/UsersPanel";
import { useAppSelector } from "@/redux/hooks";
const FpsPanel = () => {
  const fpsId = useAppSelector((state) => state.fpss.fps?.fpsId);
  return (
    <div className="">
      <span className="px-3 py-5 text-xl font-medium text-greenAccent-900">
        {fpsId} Panel
      </span>
      <UsersPanel />
    </div>
  );
};

export default FpsPanel;
