import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  SidebarHeaderInfo,
  SidebarContentTree,
  SidebarFooterInfo,
  SidebarControls,
} from "./sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarHeaderInfo />
      </SidebarHeader>
      <SidebarContent>
        {/* Controls */}
        <SidebarGroup />
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarControls />
          </SidebarMenu>
        </SidebarGroupContent>

        {/* Commands tree */}
        <SidebarGroup />
        <SidebarGroupLabel>Commands</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarContentTree />
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>

      {/* User info */}
      <SidebarFooter>
        <SidebarFooterInfo />
      </SidebarFooter>
    </Sidebar>
  );
}
