import type { Command, CommandFolder, TreeItem } from "@/types/app-types";

export function editCommandInTree(
  tree: TreeItem[],
  id: string,
  command: Command,
): TreeItem[] {
  return tree.map((i) =>
    i.type === "command"
      ? i.id === id
        ? { ...i, ...command }
        : i
      : { ...i, children: editCommandInTree(i.children, id, command) },
  );
}

export function editFolderInTree(
  tree: TreeItem[],
  id: string,
  folder: CommandFolder,
): TreeItem[] {
  return tree.map((i) => {
    if (i.type === "folder" && i.id === id) {
      return { ...i, ...folder };
    }

    if (i.type === "folder") {
      return {
        ...i,
        children: editFolderInTree(i.children, id, folder),
      };
    }

    return i;
  });
}
