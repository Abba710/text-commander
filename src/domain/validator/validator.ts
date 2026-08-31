import {
  validateLabel,
  validateTrigger,
  validateTemplate,
} from "./validator-functions";
import type {
  validatorInput,
  validatorResult,
  FieldError,
} from "@/types/validator-types";

export function validator({
  id,
  commands,
  label,
  trigger,
  template,
}: validatorInput): validatorResult {
  const errors: FieldError[] = [];

  const labelResult = validateLabel({ label });
  if (!labelResult.success) {
    errors.push({ field: "label", error: labelResult.error });
  }

  const triggerResult = validateTrigger({ id, trigger, commands });
  if (!triggerResult.success) {
    errors.push({ field: "trigger", error: triggerResult.error });
  }

  const templateResult = validateTemplate({ template });
  if (!templateResult.success) {
    errors.push({ field: "template", error: templateResult.error });
  }

  return { success: errors.length === 0, errors };
}
