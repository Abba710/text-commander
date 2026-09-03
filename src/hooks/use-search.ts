import { useCommandManagement } from "./use-command-management";
import { useFolderManagement } from "./use-folder-management";
import type { Command, CommandFolder } from "@/types/app-types";
import { useMemo } from "react";

export function useSearch() {
  const { folders } = useFolderManagement();
  const { commands } = useCommandManagement();

  const flattenCommands = (
    commands: Command[],
    folders: CommandFolder[],
  ): Command[] => {
    const flattened: Command[] = [];

    const traverseFolders = (items: CommandFolder[]) => {
      items.forEach((item) => {
        if (item.children && item.children.length > 0) {
          traverseFolders(item.children);
        }
        if (item.commands && item.commands.length > 0) {
          flattened.push(...item.commands);
        }
      });
    };
    const traverseCommands = (items: Command[]) => {
      flattened.push(...items);
    };

    traverseCommands(commands);
    traverseFolders(folders);
    return flattened;
  };

  const flattenFolders = (folders: CommandFolder[]): CommandFolder[] => {
    const flattened: CommandFolder[] = [];

    const traverseFolders = (items: CommandFolder[]) => {
      items.forEach((item) => {
        flattened.push(item);
        if (item.children && item.children.length > 0) {
          traverseFolders(item.children);
        }
      });
    };
    traverseFolders(folders);
    return flattened;
  };

  const searchQueue = useMemo(() => {
    const flatCommands = flattenCommands(commands, folders);
    const flatFolders = flattenFolders(folders);

    return { flatCommands, flatFolders };
  }, [commands, folders]);

  return searchQueue;
}
