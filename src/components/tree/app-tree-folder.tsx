import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { SidebarContextMenu } from "@/components/sidebar/app-sidebar-context-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { CommandFolderNodeProps } from "@/types/app-types";
import { FolderOpen, Folder, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { CommandLeaf } from "@/components/tree/app-tree-command";
import { SidebarDropdownMenu } from "@/components/sidebar/app-sidebar-dropdown-menu";
import { Sortable } from "../dnd/sortable";

// Commands folders
export function CommandFolderNode({
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
        <SidebarDropdownMenu
          onEdit={() => onEditFolder(folder.id)}
          onDelete={() => onDeleteFolder(folder.id)}
        >
          <SidebarMenuAction showOnHover>
            <EllipsisVertical />
          </SidebarMenuAction>
        </SidebarDropdownMenu>
        {!isEmpty && (
          <CollapsibleContent>
            <SidebarMenuSub>
              {folder.children.map((child, index) => (
                <Sortable key={child.id} id={child.id} index={index}>
                  <SidebarContextMenu
                    key={child.id}
                    onEdit={() => onEditCommand(child.id)}
                    onDelete={() => onDeleteCommand(child.id)}
                  >
                    {child.type === "folder" ? (
                      <CommandFolderNode
                        folder={child}
                        onEditCommand={onEditCommand}
                        onEditFolder={onEditFolder}
                        onDeleteCommand={onDeleteCommand}
                        onDeleteFolder={onDeleteFolder}
                      />
                    ) : (
                      <CommandLeaf
                        command={child}
                        onEditCommand={onEditCommand}
                        onDeleteCommand={onDeleteCommand}
                      />
                    )}
                  </SidebarContextMenu>
                </Sortable>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </Collapsible>
    </SidebarMenuItem>
  );
}
