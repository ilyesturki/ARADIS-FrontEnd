"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { UserNav } from "./UserNav";
import WebsiteCustomLogo from "./WebsiteCustomLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import SignOutButton from "./SignOutButton";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      allowedTo: ["admin", "manager"],
      title: "Panel",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Fps Panel",
          url: "/dashboard/panel/fps-panel",
        },
      ],
    },
    {
      allowedTo: ["user"],
      title: "Fps",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Fps Panel",
          url: "/dashboard/fps",
        },
        {
          title: "Add Fps",
          url: "/dashboard/fps/create-fps",
        },
      ],
    },
    {
      allowedTo: ["admin"],
      title: "Users",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Users Panel",
          url: "/dashboard/users",
        },
        {
          title: "Add User",
          url: "/dashboard/users/create-user",
        },
      ],
    },
  ],
};

export function CustomSideBar({
  session,
  ...props
}: { session: any } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WebsiteCustomLogo />
        <UserNav
          image={session?.user?.image}
          firstName={session?.user?.firstName}
          lastName={session?.user?.lastName}
          email={session?.user?.email}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} role={session?.user?.role} />
      </SidebarContent>
      <SidebarFooter>
        <SignOutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
