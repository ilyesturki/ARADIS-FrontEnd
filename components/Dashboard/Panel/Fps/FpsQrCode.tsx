"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
const FpsQrCode = () => {
  const fpsId = useAppSelector((state) => state.fpss.fps?.fpsId);

  return (
    <div className="">
      <div className="relative w-full h-full pt-10 pb-6 bg-grayscale-100 flex flex-col items-center gap-2 shadow-[0px_0px_2px] shadow-grayscale-500 rounded-md">
        <span className="text-sm font-medium text-grayscale-400">{fpsId}</span>
        <Image
          src="/imgs/testQrCode1.png"
          alt="qr code"
          width={200}
          height={200}
          className="w-[65%] aspect-1"
        />
        <Avatar className="absolute -top-8 h-16 w-16 rounded-full border-[2px] border-grayscale-400 shadow-[0px_0px_4px] shadow-grayscale-400">
          <AvatarImage src="/imgs/userIcon.png" alt="user image" />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default FpsQrCode;
