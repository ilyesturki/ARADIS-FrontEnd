import RadialChartStacked from "../Chart/RadialChartStacked";
import FpsQrCode from "./FpsQrCode";
import FpsSelectedUsers from "./FpsSelectedUsers";
import PieChartDonutwithText from "../Chart/PieChartDonutwithText";

const FpsPanel = () => {
  return (
    <div>
      <span className="flex px-2 py-2 text-[28px] font-semibold capitalize text-grayscale-500 text-opacity-80">
        FPS panel
      </span>
      <div className="grid grid-cols-[3fr_1fr] gap-4">
        <FpsSelectedUsers title="selected users" isSelectPageSizes={false} />
        <div className="flex-1 grid grid-rows-[auto_auto] gap-4">
          <FpsQrCode />
          <PieChartDonutwithText />
        </div>
      </div>
    </div>
  );
};

export default FpsPanel;
