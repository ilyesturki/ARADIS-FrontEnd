// "use client";
import UsersPanel from "@/components/Dashboard/User/UsersPanel";
import RadialChartStacked from "../Chart/RadialChartStacked";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
// import { useAppSelector } from "@/redux/hooks";
const FpsPanel = () => {
  // const fpsId = useAppSelector((state) => state.fpss.fps?.fpsId);
  return (
    <div className="">
      <span className="px-3 py-5 text-xl font-medium text-greenAccent-900">
        {/* {fpsId}  */}
        Panel
      </span>
      <div className="flex gap-6 items-center">
        <UsersPanel />
        <div className="bg-red-500 flex-1 grid grid-rows-2 gap-4">
          <div className="bg-red-300 px-6 py-4">
            <div className="relative w-full h-full px-4 py-11 bg-grayscale-100 flex flex-col items-center justify-start">
              <span className="text-xs font-medium text-grayscale-400">
                Panel
              </span>
              <Image
                src="/imgs/testQrCode.png"
                alt="qr code"
                width={200}
                height={200}
                className="w-5/6 aspect-1"
              />
              <Avatar className="absolute -top-6 h-16 w-16 rounded-full border-[2px] border-grayscale-400 shadow-[0px_0px_4px] shadow-grayscale-400">
                <AvatarImage src="/imgs/userIcon.png" alt="user image" />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <RadialChartStacked />
        </div>
      </div>
    </div>
  );
};

export default FpsPanel;
