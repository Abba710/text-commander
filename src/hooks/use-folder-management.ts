import { useCommandStore } from "@/store/commandStore";
import type { CommandFolder } from "@/types/app-types";
import { useCallback } from "react";

export function useFolderManagement() {
  const folders = useCommandStore((state) => state.folders);
  const addFolderToStore = useCommandStore((state) => state.addCommandFolder);
  const editFolderInStore = useCommandStore((state) => state.editCommandFolder);

  const addFolder = useCallback(
    (label: string, description: string) => {
      const folder: CommandFolder = {
        id: crypto.randomUUID(),
        label: label || "new folder",
        description: description ?? "",
        children: [],
        commands: [],
      };
      addFolderToStore(folder);
    },
    [addFolderToStore],
  );

  const findFolder = useCallback(
    (id: string) => {
      return folders.find((f: CommandFolder) => f.id === id);
    },
    [folders],
  );

  const editFolder = useCallback(
    (id: string, newLabel: string, newDescription: string) => {
      const existingFolder = folders.find((f: CommandFolder) => f.id === id);

      // If the folder doesn't exist, return an error
      if (!existingFolder) {
        return { success: false };
      }

      // Check if there are any changes
      const hasChanges =
        newLabel !== existingFolder.label ||
        newDescription !== existingFolder.description;

      // If there are no changes, return success
      if (!hasChanges) {
        return { success: true };
      }

      // Update the folder in the store
      editFolderInStore(id, {
        ...existingFolder,
        label: newLabel,
        description: newDescription,
        updTime: Date.now(),
      });

      return { success: true };
    },
    [folders, editFolderInStore],
  );

  return { folders, addFolder, findFolder, editFolder };
}
