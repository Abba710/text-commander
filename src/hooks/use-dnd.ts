import { useCallback, useRef } from "react";
import { useTreeManagement } from "./use-tree-management";
import type { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/dom";
import { isSortable } from "@dnd-kit/react/sortable";
import { move } from "@dnd-kit/helpers";
import { moveItemInTree } from "@/domain/command/tree/move-item-in-tree";

export function useDnd() {
  const { tree, setTree, findItem } = useTreeManagement();
  const snapshot = useRef(tree);

  const handleDragStart = useCallback(
    (_event: DragStartEvent) => {
      snapshot.current = tree;
    },
    [tree],
  );

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { source } = event.operation;
      if (!isSortable(source)) return;

      // only group
      if (source.initialGroup === source.group) return;

      const item = findItem(source.id as string);
      if (!item) return;

      setTree(moveItemInTree(item, source.group as string, tree, source.index));
    },
    [tree, findItem, setTree],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (event.canceled) {
        setTree(snapshot.current);
        return;
      }

      const { source } = event.operation;
      if (!isSortable(source)) return;

      // Кросс-лист уже применён в onDragOver
      if (source.initialGroup !== source.group) return;

      setTree(move(tree, event));
    },
    [tree, setTree],
  );

  return { handleDragStart, handleDragOver, handleDragEnd };
}
