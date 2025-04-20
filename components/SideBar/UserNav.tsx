"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function UserNav({
  image,
  firstName,
  lastName,
  email,
}: {
  image?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}) {
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          tooltip={`${firstName} ${lastName}`}
          className={`data-[state=open]:bg-greenAccent-900 data-[state=open]:text-sidebar-accent-foreground ${
            open && "bg-greenAccent-900"
          } hover:bg-greenAccent-900 rounded-[5px] transition-all duration-300`}
        >
          <Avatar
            className={`${
              open ? "ml-1 h-10 w-10 rounded-full" : "h-8 w-8 rounded-md"
            } transition-all duration-300`}
          >
            <AvatarImage src={image} alt={firstName} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="ml-1 grid flex-1 text-left text-sm leading-tight ">
            <span className="truncate font-semibold text-grayscale-100">
              {firstName} {lastName}
            </span>
            <span className="truncate text-xs font-medium text-grayscale-100 text-opacity-60">
              {email}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
