import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { FilePlus, FolderPlus } from "lucide-react";
import { useNavigate } from "react-router";

export function SidebarControls() {
  const navigate = useNavigate();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={() => navigate("/add-command")}>
        <FilePlus />
        Add new command
      </SidebarMenuButton>
      <SidebarMenuButton onClick={() => navigate("/add-folder")}>
        <FolderPlus />
        Add new folder
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
