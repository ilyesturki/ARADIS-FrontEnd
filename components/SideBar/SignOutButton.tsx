"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const SignOutButton = () => {
  const handleSignOut = () => {
    signOut();
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={handleSignOut}
          tooltip="log out"
          className=" flex items-center w-fit px-5 !h-10 mx-auto text-base font-semibold !bg-redAccent-900 hover:!bg-opacity-70 !text-grayscale-100"
        >
          <LogOut className=" w-6 h-6 mr-1.5 rotate-180" />
          <span>Log out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SignOutButton;
