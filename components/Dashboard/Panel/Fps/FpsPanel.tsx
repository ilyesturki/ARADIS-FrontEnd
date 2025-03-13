import RadialChartStacked from "../Chart/RadialChartStacked";
import FpsQrCode from "./FpsQrCode";
import FpsSelectedUsers from "./FpsSelectedUsers";

const FpsPanel = () => {
  return (
    <div className="">
      <div className="grid grid-cols-[3fr_1fr] gap-4">
        <FpsSelectedUsers title="selected users table" />
        <div className="flex-1 grid grid-rows-[auto_auto] gap-4">
          <FpsQrCode />
          <RadialChartStacked />
        </div>
      </div>
    </div>
  );
};

export default FpsPanel;
