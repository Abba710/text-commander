import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface SidebarContextMenuProps {
  children: React.ReactNode;
  onDelete: () => void;
  onEdit: () => void;
}

export function SidebarContextMenu({
  children,
  onDelete,
  onEdit,
}: SidebarContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <span className="">{children}</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem onClick={onEdit}>
            <PencilIcon />
            Edit
          </ContextMenuItem>
          <ContextMenuItem>
            <ShareIcon />
            Share
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem onClick={onDelete} variant="destructive">
            <TrashIcon />
            Delete
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
