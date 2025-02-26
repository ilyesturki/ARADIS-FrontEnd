"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import AnimatedWing from "./AnimatedWing";
import Image from "next/image";
const WebsiteCustomLogo = () => {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="w-full flex justify-center">
          <div className="flex py-1 items-center gap-0.5 overflow-hidden ">
            <Image
              src="/imgs/ara.png"
              alt="ara"
              width={400}
              height={400}
              className="w-12"
            />

            <div className="text-left text-2xl text-sidebar-border">ARADIS</div>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default WebsiteCustomLogo;
