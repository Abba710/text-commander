import { DragDropProvider } from "@dnd-kit/react";
import { PointerSensor, PointerActivationConstraints } from "@dnd-kit/dom";
import type { DndProviderProps } from "@/types/dnd-types";
import { useDnd } from "@/hooks/use-dnd";

export function DndProvider({ children }: DndProviderProps) {
  const { handleDragStart, handleDragOver, handleDragEnd } = useDnd();

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
      onDragStart={(event) => {
        handleDragStart(event);
      }}
      onDragOver={(event) => {
        handleDragOver(event);
      }}
      onDragEnd={(event) => {
        handleDragEnd(event);
      }}
    >
      {children}
    </DragDropProvider>
  );
}
