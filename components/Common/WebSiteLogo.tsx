import Image from "next/image";
import React from "react";

const WebSiteLogo = () => {
  return (
    <div className="relative">
      <Image
        src="/imgs/aradis.png"
        alt=""
        width={1000}
        height={1000}
        className=" w-[200px] h-auto "
      />
    </div>
  );
};

export default WebSiteLogo;
