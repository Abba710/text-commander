import { useEffect, type RefObject } from "react";
import { KEY_ACTIONS } from "@/consts/key-actions";

// Forward navigation and selection keys to shadcn Command(CMDK's) built-in handlers.
export function useKbrd(
  commandRef: RefObject<HTMLDivElement | null>,
  field: HTMLElement | null,
  mode: boolean,
) {
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
