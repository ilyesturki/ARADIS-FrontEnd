import CreateFps from "@/components/Dashboard/Fps/CreateFps/CreateFps";
import FpsPanel from "@/components/Dashboard/Panel/Fps/FpsPanel";
import FpsPanelHeader from "@/components/Dashboard/Panel/Fps/FpsPanelHeader";

const Page = () => {
  return (
    <div className=" grid grid-cols-1 gap-4 px-5 pb-2 bg-sidebar rounded-[7px] shadow-[0_0_2px] shadow-grayscale-400">
      <FpsPanelHeader />
      <CreateFps />
      <FpsPanel />
    </div>
  );
};

export default Page;
