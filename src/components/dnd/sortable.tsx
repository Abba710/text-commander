import { useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import type { DraggableItemProps } from "@/types/dnd-types";
import { CollisionPriority } from "@dnd-kit/abstract";
import { shapeIntersection } from "@dnd-kit/collision";

export function Sortable({ id, index, children }: DraggableItemProps) {
  const [element, setElement] = useState<Element | null>(null);
  const [handleRef, setHandleRef] = useState<HTMLElement | null>(null);
  const setRefs = (node: HTMLElement | null) => {
    setElement(node);
    setHandleRef(node);
  };

  const { isDragging } = useSortable({
    id,
    index,
    element,
    handle: handleRef,
    collisionPriority: CollisionPriority.Normal,
    collisionDetector: shapeIntersection,
  });

  return (
    <div ref={setRefs} data-shadow={isDragging || undefined}>
      {children}
    </div>
  );
}
