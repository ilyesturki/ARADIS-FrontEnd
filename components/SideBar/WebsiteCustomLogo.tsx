"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
const WebsiteCustomLogo = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="w-full flex justify-center">
          <div className="flex pt-4 pb-5 items-center gap-1 overflow-hidden ">
            <Image
              src="/imgs/araTwo.png"
              alt="ara"
              width={400}
              height={400}
              className="h-auto w-12"
            />
            <Image
              src="/imgs/aradisName.png"
              alt="ara"
              width={400}
              height={400}
              className="h-8 w-auto"
            />

            {/* <div className="text-left text-2xl text-grayscale-100 text-opacity-80">
              ARADIS
            </div> */}
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default WebsiteCustomLogo;
