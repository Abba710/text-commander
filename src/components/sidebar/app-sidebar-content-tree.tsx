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
import { useFolderManagement } from "@/hooks/use-folder-management";

// Commands
function CommandLeaf({
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

// Commands folders
function CommandFolderNode({
  folder,
  onEditCommand,
  onEditFolder,
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
                  onEdit={() => onEditCommand(child.id)}
                  onDelete={() => onDeleteCommand(child.id)}
                >
                  <CommandFolderNode
                    folder={child}
                    onEditCommand={onEditCommand}
                    onEditFolder={onEditFolder}
                    onDeleteCommand={onDeleteCommand}
                    onDeleteFolder={onDeleteFolder}
                  />
                </SidebarContextMenu>
              ))}
              {folder.commands.map((command) => (
                <SidebarContextMenu
                  key={command.id}
                  onEdit={() => onEditCommand(command.id)}
                  onDelete={() => onDeleteCommand(command.id)}
                >
                  <CommandLeaf
                    command={command}
                    onEditCommand={onEditCommand}
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
  const { removeFolder } = useFolderManagement();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteCommand = (commandId: string) =>
    deleteCommand(commandId, id);
  const handleEditCommand = (commandId: string) => {
    navigate(`edit-command/${commandId}`);
  };
  const handleEditFolder = (folderId: string) => {
    navigate(`edit-folder/${folderId}`);
  };
  const handleDeleteFolder = (folderId: string) => removeFolder(folderId, id);

  return (
    <>
      {commandFolders?.map((folder) => (
        <SidebarContextMenu
          key={folder.id}
          onEdit={() => handleEditFolder(folder.id)}
          onDelete={() => handleDeleteFolder(folder.id)}
        >
          <CommandFolderNode
            folder={folder}
            onEditCommand={handleEditCommand}
            onEditFolder={handleEditFolder}
            onDeleteCommand={handleDeleteCommand}
            onDeleteFolder={handleDeleteFolder}
          />
        </SidebarContextMenu>
      ))}
      {commands.map((command) => (
        <SidebarContextMenu
          key={command.id}
          onEdit={() => handleEditCommand(command.id)}
          onDelete={() => handleDeleteCommand(command.id)}
        >
          <CommandLeaf
            command={command}
            onEditCommand={handleEditCommand}
            onDeleteCommand={handleDeleteCommand}
          />
        </SidebarContextMenu>
      ))}
    </>
  );
}
