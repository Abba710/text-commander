import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type {
  Tree,
  CommandLeafProps,
  CommandFolderNodeProps,
} from "@/types/app-types";
import { ChevronRight, File, Folder, EllipsisVertical } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { SidebarContextMenu } from "./app-sidebar-context-menu";
import { SidebarDropdownMenu } from "./app-sidebar-dropdown-menu";
import { useCommandManagement } from "@/hooks/use-command-management";

// Commands
function CommandLeaf({ command, onDeleteCommand }: CommandLeafProps) {
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
      <SidebarDropdownMenu onDelete={() => onDeleteCommand(command.id)}>
        <SidebarMenuAction showOnHover>
          <EllipsisVertical />
        </SidebarMenuAction>
      </SidebarDropdownMenu>
    </SidebarMenuItem>
  );
}

// Commands folders
function CommandFolderNode({
  folder,
  onDeleteCommand,
  onDeleteFolder,
}: CommandFolderNodeProps) {
  const isEmpty = folder.commands.length === 0 && folder.children.length === 0;
  return (
    <SidebarMenuItem>
      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger
          render={
            <SidebarMenuButton className="[&[data-panel-open]_.chevron]:rotate-90">
              <ChevronRight className="chevron transition-transform" />
              <Folder />
              {folder.label}
            </SidebarMenuButton>
          }
        />
        {!isEmpty && (
          <CollapsibleContent>
            <SidebarMenuSub>
              {folder.children.map((child) => (
                <SidebarContextMenu
                  key={child.id}
                  onDelete={() => onDeleteFolder(child.id)}
                >
                  <CommandFolderNode
                    folder={child}
                    onDeleteCommand={onDeleteCommand}
                    onDeleteFolder={onDeleteFolder}
                  />
                </SidebarContextMenu>
              ))}
              {folder.commands.map((command) => (
                <SidebarContextMenu
                  key={command.id}
                  onDelete={() => onDeleteCommand(command.id)}
                >
                  <CommandLeaf
                    command={command}
                    onDeleteCommand={onDeleteCommand}
                  />
                </SidebarContextMenu>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </Collapsible>
    </SidebarMenuItem>
  );
}

// Sidebar content tree
export function SidebarContentTree({ commands, commandFolders }: Tree) {
  const { deleteCommand } = useCommandManagement();
  const { id } = useParams();

  const handleDeleteCommand = (commandId: string) =>
    deleteCommand(commandId, id);
  const handleDeleteFolder = () => console.log("folder deleted");

  return (
    <>
      {commandFolders?.map((folder) => (
        <SidebarContextMenu
          key={folder.id}
          onDelete={() => handleDeleteFolder()}
        >
          <CommandFolderNode
            folder={folder}
            onDeleteCommand={handleDeleteCommand}
            onDeleteFolder={handleDeleteFolder}
          />
        </SidebarContextMenu>
      ))}
      {commands.map((command) => (
        <SidebarContextMenu
          key={command.id}
          onDelete={() => handleDeleteCommand(command.id)}
        >
          <CommandLeaf
            command={command}
            onDeleteCommand={handleDeleteCommand}
          />
        </SidebarContextMenu>
      ))}
    </>
  );
}
