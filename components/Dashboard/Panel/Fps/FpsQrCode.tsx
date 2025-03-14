"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
const FpsQrCode = () => {
  const fpsId = useAppSelector((state) => state.fpss.fps?.fpsId);

  return (
    <div className="">
      <div className=" relative w-full h-full pt-[36px] pb-6 bg-grayscale-100 flex flex-col items-center gap-2.5 shadow-[0px_0px_2px] shadow-grayscale-400 rounded-md">
        <span className="text-[12px] font-medium text-greenAccent-900 text-opacity-90">
          {fpsId}
        </span>
        <div className="relative w-[65%] aspect-1 p-3 border-4 border-greenAccent-800 border-opacity-70">
          <Image
            src="/imgs/testQrCode1.png"
            alt="qr code"
            width={200}
            height={200}
            className="w-full"
          />
          <div className="absolute left-[15%] -top-1.5 w-[70%] h-2 bg-grayscale-100 "></div>
          <div className="absolute left-[15%] -bottom-1.5 w-[70%] h-2 bg-grayscale-100 "></div>
          <div className="absolute -left-1.5 top-[15%] w-2 h-[70%] bg-grayscale-100 "></div>
          <div className="absolute -right-1.5 top-[15%] w-2 h-[70%] bg-grayscale-100 "></div>
        </div>
        <Avatar className="absolute -top-9 h-16 w-16 rounded-full border-[2px] border-grayscale-400 shadow-[0px_0px_4px] shadow-grayscale-400">
          <AvatarImage src="/imgs/userIcon.png" alt="user image" />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <Image
          src="/imgs/aradis.png"
          alt="ara"
          width={400}
          height={400}
          className="w-[70px] h-auto mt-1"
        />
      </div>
    </div>
  );
};

export default FpsQrCode;
