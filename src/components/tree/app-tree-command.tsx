import type { CommandLeafProps } from "@/types/app-types";
import { useNavigate } from "react-router";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from "../ui/sidebar";
import { SidebarDropdownMenu } from "../sidebar/app-sidebar-dropdown-menu";
import { File, EllipsisVertical } from "lucide-react";

// Commands
export function CommandLeaf({
  command,
  onEditCommand,
  onDeleteCommand,
}: CommandLeafProps) {
  const navigate = useNavigate();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => navigate(`/edit-command/${command.id}`)}
        className="data-[active=true]:bg-transparent"
      >
        <File />
        {command.label}
      </SidebarMenuButton>
      <SidebarDropdownMenu
        onEdit={() => onEditCommand(command.id)}
        onDelete={() => onDeleteCommand(command.id)}
      >
        <SidebarMenuAction showOnHover>
          <EllipsisVertical />
        </SidebarMenuAction>
      </SidebarDropdownMenu>
    </SidebarMenuItem>
  );
}
