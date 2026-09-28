import type { TreeItem } from "@/types/app-types";

type RemoveFromTreeResult = [removedItem: TreeItem | null, tree: TreeItem[]];

function removeFromTree(
  itemId: string,
  tree: TreeItem[],
): RemoveFromTreeResult {
  for (let i = 0; i < tree.length; i++) {
    const current = tree[i];

    if (current.id === itemId) {
      const removedItem = { ...current };

      return [removedItem, [...tree.slice(0, i), ...tree.slice(i + 1)]];
    }

    if (current.type === "folder") {
      const [removedItem, newChildren] = removeFromTree(
        itemId,
        current.children,
      );

      if (removedItem) {
        return [
          removedItem,
          [
            ...tree.slice(0, i),
            {
              ...current,
              children: newChildren,
            },
            ...tree.slice(i + 1),
          ],
        ];
      }
    }
  }

  return [null, tree];
}

export function moveItemInTree(
  item: TreeItem,
  groupId: string,
  tree: TreeItem[],
  index: number,
): TreeItem[] {
  const [removedItem, treeWithoutItem] = removeFromTree(item.id, tree);

  if (!removedItem) {
    return tree;
  }

  return addToFolder(groupId, removedItem, treeWithoutItem, index);
}

function addToFolder(
  groupId: string,
  item: TreeItem,
  tree: TreeItem[],
  index: number,
): TreeItem[] {
  for (let i = 0; i < tree.length; i++) {
    const current = tree[i];

    if (groupId === "1ROOT") {
      return [...tree.slice(0, index), item, ...tree.slice(index)];
    }

    if (current.id === groupId && current.type === "folder") {
      return [
        ...tree.slice(0, i),
        {
          ...current,
          children: [
            ...current.children.slice(0, index),
            item,
            ...current.children.slice(index),
          ],
        },
        ...tree.slice(i + 1),
      ];
    }

    if (current.type === "folder") {
      const newChildren = addToFolder(groupId, item, current.children, index);

      if (newChildren !== current.children) {
        return [
          ...tree.slice(0, i),
          {
            ...current,
            children: newChildren,
          },
          ...tree.slice(i + 1),
        ];
      }
    }
  }

  return tree;
}
