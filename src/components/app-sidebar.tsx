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
import { useCommandManagement } from "@/hooks/use-command-management";
import { useFolderManagement } from "@/hooks/use-folder-management";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function AppSidebar() {
  const { commands } = useCommandManagement();
  const { folders } = useFolderManagement();

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
            <SidebarContentTree commands={commands} commandFolders={folders} />
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
