import type { TreeItem } from "@/types/app-types";

export function removeById(id: string, tree: TreeItem[]): TreeItem[] {
  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];

    if (item.id === id) {
      return [...tree.slice(0, i), ...tree.slice(i + 1)];
    }

    if (item.type === "folder") {
      const newChildren = removeById(id, item.children);

      if (newChildren !== item.children) {
        return [
          ...tree.slice(0, i),
          {
            ...item,
            children: newChildren,
          },
          ...tree.slice(i + 1),
        ];
      }
    }
  }

  return tree;
}
