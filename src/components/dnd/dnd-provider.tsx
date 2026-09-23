import { DragDropProvider } from "@dnd-kit/react";
import { PointerSensor, PointerActivationConstraints } from "@dnd-kit/dom";
import type { DndProviderProps } from "@/types/dnd-types";

export function DndProvider({ children }: DndProviderProps) {
  return (
    <DragDropProvider
      sensors={[
        PointerSensor.configure({
          activationConstraints: [
            new PointerActivationConstraints.Distance({
              value: 5,
            }),
          ],
        }),
      ]}
      onDragStart={() => {
        console.log("drag start");
      }}
    >
      {children}
    </DragDropProvider>
  );
}
