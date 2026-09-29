import { useNavigate, useParams } from "react-router";
import { SidebarContextMenu } from "../sidebar/app-sidebar-context-menu";
import { useTreeManagement } from "@/hooks/use-tree-management";
import { CommandLeaf } from "@/components/tree/app-tree-command";
import { CommandFolderNode } from "@/components/tree/app-tree-folder";
import { Sortable, DndProvider } from "@/components/dnd/";

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
      <DndProvider>
        {tree.map((item, index) => (
          <Sortable key={item.id} id={item.id} group={"1ROOT"} index={index}>
            {item.type === "folder" ? (
              <SidebarContextMenu
                onEdit={() => handleEditFolder(item.id)}
                onDelete={() => handleDelete(item.id)}
              >
                <CommandFolderNode
                  folder={item}
                  onEditCommand={handleEditCommand}
                  onEditFolder={handleEditFolder}
                  onDeleteCommand={handleDelete}
                  onDeleteFolder={handleDelete}
                />
              </SidebarContextMenu>
            ) : (
              <SidebarContextMenu
                onEdit={() => handleEditCommand(item.id)}
                onDelete={() => handleDelete(item.id)}
              >
                <CommandLeaf
                  command={item}
                  onEditCommand={handleEditCommand}
                  onDeleteCommand={handleDelete}
                />
              </SidebarContextMenu>
            )}
          </Sortable>
        ))}
        {tree.length === 1 && (
          <Sortable key={"1ROOT"} id="1ROOT" group="1ROOT" index={1}>
            <div className="h-1"></div>
          </Sortable>
        )}
      </DndProvider>
    </>
  );
}
