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
  CommandLeafProps,
  CommandFolderNodeProps,
} from "@/types/app-types";
import { FolderOpen, File, Folder, EllipsisVertical } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { SidebarContextMenu } from "./app-sidebar-context-menu";
import { SidebarDropdownMenu } from "./app-sidebar-dropdown-menu";
import { useTreeManagement } from "@/hooks/use-tree-management";
import { useState } from "react";

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
  const isEmpty = folder.children.length === 0;
  const [open, setOpen] = useState(false);
  return (
    <SidebarMenuItem>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger
          render={
            <SidebarMenuButton>
              {open ? <FolderOpen /> : <Folder />}
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
                  {child.type === "folder" && (
                    <CommandFolderNode
                      folder={child}
                      onEditCommand={onEditCommand}
                      onEditFolder={onEditFolder}
                      onDeleteCommand={onDeleteCommand}
                      onDeleteFolder={onDeleteFolder}
                    />
                  )}
                </SidebarContextMenu>
              ))}
              {folder.children.map((command) => (
                <SidebarContextMenu
                  key={command.id}
                  onEdit={() => onEditCommand(command.id)}
                  onDelete={() => onDeleteCommand(command.id)}
                >
                  {command.type === "command" && (
                    <CommandLeaf
                      command={command}
                      onEditCommand={onEditCommand}
                      onDeleteCommand={onDeleteCommand}
                    />
                  )}
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
export function SidebarContentTree() {
  const { tree, removeTreeItem } = useTreeManagement();

  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = (currentItemId: string) =>
    removeTreeItem(currentItemId, id);
  const handleEditCommand = (commandId: string) => {
    navigate(`edit-command/${commandId}`);
  };
  const handleEditFolder = (folderId: string) => {
    navigate(`edit-folder/${folderId}`);
  };

  return (
    <>
      {tree.map(
        (folder) =>
          folder.type === "folder" && (
            <SidebarContextMenu
              key={folder.id}
              onEdit={() => handleEditFolder(folder.id)}
              onDelete={() => handleDelete(folder.id)}
            >
              <CommandFolderNode
                folder={folder}
                onEditCommand={handleEditCommand}
                onEditFolder={handleEditFolder}
                onDeleteCommand={handleDelete}
                onDeleteFolder={handleDelete}
              />
            </SidebarContextMenu>
          ),
      )}

      {tree.map(
        (command) =>
          command.type === "command" && (
            <SidebarContextMenu
              key={command.id}
              onEdit={() => handleEditCommand(command.id)}
              onDelete={() => handleDelete(command.id)}
            >
              <CommandLeaf
                command={command}
                onEditCommand={handleEditCommand}
                onDeleteCommand={handleDelete}
              />
            </SidebarContextMenu>
          ),
      )}
    </>
  );
}
