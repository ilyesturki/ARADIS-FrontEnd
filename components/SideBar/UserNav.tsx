"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          tooltip={`${firstName} ${lastName}`}
          className="data-[state=open]:bg-greenAccent-900 data-[state=open]:text-sidebar-accent-foreground bg-gradient-to-r to-[#2AC68F] from-greenAccent-900 hover:bg-greenAccent-900 rounded-[5px] "
        >
          <Avatar className="h-8 w-8 rounded-lg ">
            <AvatarImage src={image} alt={firstName} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight ">
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
