import type { TreeItem } from "@/types/app-types";

export function findItemInTree(
  id: string,
  tree: TreeItem[],
): TreeItem | undefined {
  for (const item of tree) {
    if (item.type === "command") {
      if (item.id === id) return item;
      continue;
    }

    if (item.id === id) {
      return item;
    } else {
      const result = findItemInTree(id, item.children);
      if (result) return result;
    }
  }

  return undefined;
}
