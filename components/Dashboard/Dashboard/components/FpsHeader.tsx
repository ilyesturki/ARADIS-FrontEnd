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
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-greenAccent-900">
          {fpsId}
        </span>
        <FpsStatus type={type} />
      </div>
      <FpsPeriority periority={periority} />
    </div>
  );
};

export default FpsHeader;
