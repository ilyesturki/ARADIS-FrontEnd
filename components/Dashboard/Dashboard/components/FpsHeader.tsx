import FpsPeriority from "./FpsPeriority";
import FpsStatus from "./FpsStatus";

const FpsHeader = ({
  fpsId,
  type,
  periority,
}: {
  fpsId: string;
  type: string;
  periority: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-medium text-greenAccent-900">
          {fpsId}
        </span>
        <FpsStatus type={type} />
      </div>
      <FpsPeriority periority={periority} />
    </div>
  );
};

export default FpsHeader;
