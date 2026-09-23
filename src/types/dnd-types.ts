import type { ReactNode } from "react";

export interface DraggableItemProps {
  id: string;
  index: number;
  children: ReactNode;
}

export interface DndProviderProps {
  children: ReactNode;
}
