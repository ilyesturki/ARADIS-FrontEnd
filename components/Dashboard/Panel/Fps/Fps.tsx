import CreateFps from "@/components/Dashboard/Fps/CreateFps/CreateFps";
import FpsPanel from "@/components/Dashboard/Panel/Fps/FpsPanel";
import FpsHeader from "@/components/Dashboard/Panel/Fps/FpsHeader";

const Fps = () => {
  return (
    <div className=" grid grid-cols-1 gap-8 px-5 pb-2 bg-sidebar border rounded-md">
      <FpsHeader />
      <FpsPanel />
      <CreateFps />
    </div>
  );
};

export default Fps;
