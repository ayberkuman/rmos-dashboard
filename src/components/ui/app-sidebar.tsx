"use client";

import * as React from "react";

import { NavMain } from "@/components/ui/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartColumnIncreasing, LogOut, Shell, ShieldBan } from "lucide-react";
import { logout } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";

const data = {
  navMain: [
    {
      title: "Forecast",
      url: "/forecast",
      icon: ChartColumnIncreasing,
    },
    {
      title: "Blacklist",
      url: "/blacklist",
      icon: ShieldBan,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Shell className="!size-5" />
                <span className="text-base font-semibold">Rmos</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          onClick={() => {
            logoutAction();
          }}
          className="data-[slot=sidebar-menu-button]:!p-1.5"
        >
          <LogOut />
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
