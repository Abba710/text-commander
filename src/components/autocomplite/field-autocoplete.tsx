// content/field-autocomplete.tsx
import { useEffect, useState } from "react";
import { AutoComplete } from "./app-auto-complite";
import { useFocusedField } from "@/hooks/use-kbrd";

const MIN_WIDTH = 280;

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLElement;

function readValue(el: Field) {
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    return el.value;
  }
  return el.textContent ?? "";
}

function writeValue(el: Field, next: string) {
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    const proto = Object.getPrototypeOf(el);
    // Нативный setter нужен, чтобы React на странице увидел изменение
    Object.getOwnPropertyDescriptor(proto, "value")?.set?.call(el, next);
  } else {
    el.textContent = next;
  }
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

export function FieldAutoComplete() {
  const field = useFocusedField();
  const [value, setValue] = useState("");
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const onInput = (e: Event) => {
      if (e.target !== field || !field) return;
      setValue(readValue(field));
    };
    document.addEventListener("focusin", onInput, true);
    document.addEventListener("input", onInput, true);
    return () => {
      document.removeEventListener("focusin", onInput, true);
      document.removeEventListener("input", onInput, true);
    };
  }, [field]);

  useEffect(() => {
    if (!field) {
      setRect(null);
      return;
    }

    const update = () => setRect(field.getBoundingClientRect());
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [field, value]);

  const handleSetValue = (next: string) => {
    if (!field) return;
    writeValue(field, next);
    setValue(next);
  };

  if (!field || !rect) return null;

  const listStyle = {
    position: "fixed",
    top: rect.top - 120,
    left: rect.left,
    width: Math.max(rect.width, MIN_WIDTH),
    zIndex: 2147483647,
  } as const;

  return (
    <div style={listStyle} onMouseDown={(e) => e.preventDefault()}>
      <AutoComplete value={value} field={field} setValue={handleSetValue} />
    </div>
  );
}
