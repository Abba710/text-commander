import {
  validateLabel,
  validateTrigger,
  validateTemplate,
} from "./validator-functions";
import type { validatorInput, validatorResult } from "../types";

export function validator({
  commands,
  label,
  trigger,
  template,
}: validatorInput): validatorResult {
  const labelResult = validateLabel({ label });
  if (!labelResult.success) {
    return { success: false, field: "label", error: labelResult.error };
  }

  const triggerResult = validateTrigger({ trigger, commands });
  if (!triggerResult.success) {
    return { success: false, field: "trigger", error: triggerResult.error };
  }

  const templateResult = validateTemplate({ template });
  if (!templateResult.success) {
    return { success: false, field: "template", error: templateResult.error };
  }

  return { success: true };
}
