import { useCommandStore } from "@/store/commandStore";
import type { CommandFolder } from "@/types/app-types";
import { useCallback } from "react";

export function useFolderManagement() {
  const folders = useCommandStore((state) => state.folders);
  const addFolderToStore = useCommandStore((state) => state.addCommandFolder);
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
  return { folders, addFolder };
}
