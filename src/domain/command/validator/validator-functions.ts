import type { ValidationResult } from "@/types/validator-types";
import type {
  ValidateLabel,
  ValidateTrigger,
  ValidateTemplate,
} from "@/types/validator-types";

export function validateLabel({ label }: ValidateLabel): ValidationResult {
  if (!label.trim()) {
    return {
      success: false,
      error: "EMPTY",
    };
  }
  return {
    success: true,
  };
}

export function validateTrigger({
  id,
  trigger,
  tree,
}: ValidateTrigger): ValidationResult {
  if (!trigger.trim()) {
    return {
      success: false,
      error: "EMPTY",
    };
  }

  for (const item of tree) {
    if (item.type === "command") {
      if (item.trigger === trigger && item.id !== id) {
        return {
          success: false,
          error: "ALREADY_EXISTS",
        };
      }

      continue;
    }

    const result = validateTrigger({
      id,
      trigger,
      tree: item.children,
    });

    if (!result.success) {
      return result;
    }
  }

  return {
    success: true,
  };
}

export function validateTemplate({
  template,
}: ValidateTemplate): ValidationResult {
  if (!template.trim()) {
    return {
      success: false,
      error: "EMPTY",
    };
  }
  return {
    success: true,
  };
}
