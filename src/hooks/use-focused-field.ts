import { useState, useEffect } from "react";
import type { FieldTypes } from "@/types/app-types";
import { isTextInput } from "@/domain/command/validator/text-field-validator";

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
