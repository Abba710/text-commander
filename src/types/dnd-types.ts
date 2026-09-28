import type { ReactNode } from "react";

export interface DraggableItemProps {
  id: string;
  index: number;
  group: string;
  children: ReactNode;
}

export interface DndProviderProps {
  children: ReactNode;
}
