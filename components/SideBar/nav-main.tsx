"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import Link from "next/link";

import { usePathname } from "@/i18n/navigation";

export function NavMain({
  items,
  role,
}: {
  items: {
    allowedTo?: string[];
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  role?: string;
}) {
  const path = usePathname();
  const currentPath = path.split("/").join("/");
  console.log(currentPath);

  // const isAdminOrManager = useMemo(
  //   () => ["admin", "manager"].includes(session?.user.role ?? ""),
  //   [session?.user.role]
  // );

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-grayscale-100">
        Dashboard
      </SidebarGroupLabel>
      <SidebarMenu>
        {items
          .filter((e) => !e.allowedTo || e.allowedTo?.includes(role ?? ""))
          .map((item) => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="!h-10 text-base text-grayscale-100 hover:!text-grayscale-500"
                  >
                    {item.icon && (
                      <item.icon
                        className={`!size-[18px] ${
                          item.items?.some(
                            (item) => item.url === currentPath
                          ) && "text-greenAccent-700"
                        }`}
                      />
                    )}
                    <span className="pt-0.5">{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub
                    className={`${
                      item.items?.some((item) => item.url === currentPath) &&
                      "border-greenAccent-700"
                    }`}
                  >
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem
                        key={subItem.title}
                        className="hover:!text-grayscale-500"
                      >
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={subItem.url}
                            className={` hover:!text-grayscale-500 ${
                              subItem.url === currentPath
                                ? "!text-greenAccent-700"
                                : "!text-grayscale-100"
                            }`}
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
