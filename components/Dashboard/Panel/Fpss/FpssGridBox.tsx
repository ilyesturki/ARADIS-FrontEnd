import { FpsType } from "@/redux/fps/fpsSlice";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const Fps = dynamic(() => import("../../Dashboard/components/Fps"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[350px]" />,
});

const FpssGridBox = ({ fpss }: { fpss: FpsType[] }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
      {fpss.map((fps: FpsType) => (
        <Fps key={fps.fpsId} fps={fps} />
      ))}
    </div>
  );
};

export default FpssGridBox;
