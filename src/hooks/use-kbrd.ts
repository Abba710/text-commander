import { isTextInput } from "@/domain/command/validator/text-field-validator";
import { useEffect, useState, type RefObject } from "react";
import type { FieldTypes } from "@/types/app-types";
// hook for catch focus event
export function useFocusedField() {
  const [field, setField] = useState<FieldTypes>(null);

  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      console.log("focus event: ", e);
      const target = e.target;
      console.log("event before check HTMLEl type: ", target);

      if (target instanceof HTMLElement && isTextInput(target)) {
        setField(target);
        console.log("after check: ", target);
      } else {
        setField(null);
      }
    };

    const onFocusOut = () => {
      console.log("focus out");
      setField(null);
    };
    document.addEventListener("focusin", onFocusIn, true);
    document.addEventListener("focusout", onFocusOut, true);

    return () => {
      document.removeEventListener("focusin", onFocusIn, true);
      document.removeEventListener("focusout", onFocusOut, true);
    };
  }, []);

  return field;
}

export function useKbrd(
  commandRef: RefObject<HTMLDivElement | null>,
  field: HTMLElement | null,
  mode: boolean,
) {
  type KeyAction = "navigate" | "accept" | "close";

  const KEY_ACTIONS: Record<string, KeyAction> = {
    ArrowUp: "navigate",
    ArrowDown: "navigate",
    Enter: "accept",
    Tab: "accept",
    Escape: "close",
  };

  useEffect(() => {
    if (mode === false || !field) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.isTrusted) return;
      const action = KEY_ACTIONS[e.key];
      if (!action) return;
      e.preventDefault();
      e.stopImmediatePropagation();

      if (action) {
        commandRef.current?.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: e.key,
            bubbles: true,
            cancelable: true,
          }),
        );
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [commandRef, field, mode]);
}
