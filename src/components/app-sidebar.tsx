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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

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
        <SidebarFooterInfo user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
