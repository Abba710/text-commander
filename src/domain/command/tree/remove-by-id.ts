import type { TreeItem } from "@/types/app-types";

export function removeById(id: string, tree: TreeItem[]): TreeItem[] {
  return tree
    .filter((i) => i.id !== id)
    .map((i) => {
      if (i.type === "folder") {
        if (i.children) {
          return {
            ...i,
            children: removeById(id, i.children),
          };
        }
      }
      return i;
    });
}
