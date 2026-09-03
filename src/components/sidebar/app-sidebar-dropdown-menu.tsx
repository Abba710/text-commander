"use client";

import { PencilIcon, ShareIcon, Check, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function SidebarDropdownMenu({
  onDelete,
  onEdit,
  children,
}: {
  onDelete: () => void;
  onEdit?: () => void;
  children: React.ReactElement;
}) {
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
    <DropdownMenu>
      <DropdownMenuTrigger render={children} />
      <DropdownMenuContent side="right" align="start" sideOffset={4}>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onEdit}>
            <PencilIcon />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareIcon />
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
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
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
