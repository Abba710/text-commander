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

function insertAt(list: TreeItem[], item: TreeItem, index: number): TreeItem[] {
  const safeIndex = Math.max(0, Math.min(index, list.length));
  return [...list.slice(0, safeIndex), item, ...list.slice(safeIndex)];
}

function addToFolder(
  groupId: string,
  item: TreeItem,
  tree: TreeItem[],
  index: number,
): TreeItem[] {
  if (groupId === "1ROOT") {
    return insertAt(tree, item, index);
  }

  for (let i = 0; i < tree.length; i++) {
    const current = tree[i];
    if (current.type !== "folder") continue;

    if (current.id === groupId) {
      return [
        ...tree.slice(0, i),
        { ...current, children: insertAt(current.children, item, index) },
        ...tree.slice(i + 1),
      ];
    }

    const newChildren = addToFolder(groupId, item, current.children, index);
    if (newChildren !== current.children) {
      return [
        ...tree.slice(0, i),
        { ...current, children: newChildren },
        ...tree.slice(i + 1),
      ];
    }
  }

  return tree;
}
