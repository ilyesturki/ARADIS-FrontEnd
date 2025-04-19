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
    // users
    {
      allowedTo: ["user"],
      title: "Auto MTCE",
      url: "/auto-mtce",
      icon: SquareTerminal,
    },
    {
      allowedTo: ["user"],
      title: "Diag MTCE",
      url: "/diag-mtce",
      icon: SquareTerminal,
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
      allowedTo: ["user"],
      title: "Audit",
      url: "/audit",
      icon: SquareTerminal,
    },
    {
      allowedTo: ["user"],
      title: "Planing",
      url: "/planing",
      icon: SquareTerminal,
    },
    {
      allowedTo: ["user"],
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },

    // managers
    {
      allowedTo: ["admin", "manager"],
      title: "Fps",
      url: "/dashboard/panel/fps-panel",
      icon: SquareTerminal,
    },
    {
      allowedTo: ["admin", "manager"],
      title: "Auto-MTCE",
      url: "/dashboard/panel/auto-mtce",
      icon: SquareTerminal,
    },
    {
      allowedTo: ["admin", "manager"],
      title: "Tag",
      url: "/dashboard/panel/tag-panel",
      icon: SquareTerminal,
    },
    {
      allowedTo: ["manager"],
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      allowedTo: ["admin", "manager"],
      title: "Planing",
      url: "/planing",
      icon: SquareTerminal,
    },
    {
      allowedTo: ["admin", "manager"],
      title: "Audit",
      url: "/audit",
      icon: SquareTerminal,
    },
    // admin
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
    <Sidebar
      collapsible="icon"
      {...props}
      className="transition-all duration-300"
    >
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
