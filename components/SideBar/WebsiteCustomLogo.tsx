"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
const WebsiteCustomLogo = () => {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="w-full flex justify-center">
          <div className="flex py-1.5 items-center gap-0.5 overflow-hidden ">
            <Image
              src="/imgs/ara.png"
              alt="ara"
              width={400}
              height={400}
              className="w-12 h-auto"
            />

            <div className="text-left text-2xl text-grayscale-100 text-opacity-80">
              ARADIS
            </div>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default WebsiteCustomLogo;
