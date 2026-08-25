import type { validationResult } from "../types";
import type {
  validateLabel,
  validateTrigger,
  validateTemplate,
} from "../types";

export function validateLabel({ label }: validateLabel): validationResult {
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
  commands,
}: validateTrigger): validationResult {
  if (!trigger.trim()) {
    return {
      success: false,
      error: "EMPTY",
    };
  }

  if (
    commands.some((command) => command.trigger === trigger && command.id !== id)
  ) {
    return {
      success: false,
      error: "ALREADY_EXISTS",
    };
  }

  return {
    success: true,
  };
}

export function validateTemplate({
  template,
}: validateTemplate): validationResult {
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
