import {
  validateLabel,
  validateTrigger,
  validateTemplate,
} from "./validator-functions";
import type {
  ValidatorInput,
  ValidatorResult,
  FieldError,
} from "@/types/validator-types";

export function validator({
  id,
  tree,
  label,
  trigger,
  template,
}: ValidatorInput): ValidatorResult {
  const errors: FieldError[] = [];

  const labelResult = validateLabel({ label });
  if (!labelResult.success) {
    errors.push({ field: "label", error: labelResult.error });
  }

  const triggerResult = validateTrigger({ id, trigger, tree });
  if (!triggerResult.success) {
    errors.push({ field: "trigger", error: triggerResult.error });
  }

  const templateResult = validateTemplate({ template });
  if (!templateResult.success) {
    errors.push({ field: "template", error: templateResult.error });
  }

  return { success: errors.length === 0, errors };
}
