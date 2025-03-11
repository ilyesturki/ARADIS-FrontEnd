
import CreateFps from "@/components/Dashboard/Fps/CreateFps/CreateFps";
import FpsPanelHeader from "@/components/Dashboard/Panel/Fps/FpsPanelHeader";

const Page = () => {
  
  return (
    <div className="px-3 py-2 bg-grayscale-300 rounded-[7px] shadow-[0_0_2px] shadow-grayscale-400">
      <FpsPanelHeader />
      <CreateFps />
    </div>
  );
};

export default Page;
