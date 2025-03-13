import CreateFps from "@/components/Dashboard/Fps/CreateFps/CreateFps";
import FpsPanel from "@/components/Dashboard/Panel/Fps/FpsPanel";
import ShowFpsHeader from "@/components/Dashboard/Panel/Fps/ShowFpsHeader";

const Fps = () => {
  return (
    <div className=" grid grid-cols-1 gap-4 px-5 pb-2 bg-sidebar rounded-[7px] shadow-[0_0_2px] shadow-grayscale-400">
      <ShowFpsHeader />
      <span className="flex px-2 text-3xl font-medium text-greenAccent-900 capitalize ">
        fps panel
      </span>
      <FpsPanel />
      <CreateFps />
    </div>
  );
};

export default Fps;
