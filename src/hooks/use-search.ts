import { useCommandStore } from "@/store/commandStore";
import type { Command, CommandFolder, TreeItem } from "@/types/app-types";
import { useMemo } from "react";

export function useSearch() {
  const tree = useCommandStore((state) => state.tree);

  const flattenTree = (
    tree: TreeItem[],
  ): {
    flattenedCommands: Command[];
    flattenedFolders: CommandFolder[];
  } => {
    const flattenedCommands: Command[] = [];
    const flattenedFolders: CommandFolder[] = [];

    const traverseTree = (items: TreeItem[]) => {
      items.forEach((item) => {
        if (item.type === "command") {
          flattenedCommands.push(item);
        } else {
          flattenedFolders.push(item);
          traverseTree(item.children);
        }
      });
    };

    traverseTree(tree);

    return {
      flattenedCommands,
      flattenedFolders,
    };
  };

  const searchQueue = useMemo(() => {
    const flatTree = flattenTree(tree);

    return flatTree;
  }, [tree]);

  return searchQueue;
}
