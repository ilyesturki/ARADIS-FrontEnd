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
          className=" flex items-center w-fit px-6 !h-10 mx-auto text-base font-medium !bg-redAccent-900 text-grayscale-100"
        >
          <LogOut className=" w-4 h-4 mr-2 rotate-180" />
          <span>Log out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SignOutButton;
