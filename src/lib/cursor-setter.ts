import type { FieldTypes } from "@/types/app-types";

export function setCursor(f: FieldTypes, text: string) {
  if (f instanceof HTMLInputElement || f instanceof HTMLTextAreaElement) {
    const end = text.length;
    f.setSelectionRange(end, end);
  } else {
    const selection = window.getSelection();
    selection?.modify("move", "forward", "documentBoundary");
  }
}
