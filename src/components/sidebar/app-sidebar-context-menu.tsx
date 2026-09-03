import { PencilIcon, ShareIcon, Trash2, Check } from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useState } from "react";

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
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete();
      setConfirmDelete(false);
      return;
    }

    setConfirmDelete(true);

    setTimeout(() => {
      setConfirmDelete(false);
    }, 3000);
  };

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
          <ContextMenuItem
            closeOnClick={false}
            onClick={handleDelete}
            variant="destructive"
          >
            {confirmDelete ? (
              <>
                Sure? <Check />
              </>
            ) : (
              <>
                Delete <Trash2 />
              </>
            )}
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
