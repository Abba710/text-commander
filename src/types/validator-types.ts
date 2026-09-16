import type { TreeItem } from "@/types/app-types";

export type TriggerError = "EMPTY" | "ALREADY_EXISTS";

export interface ValidatorInput {
  id: string;
  tree: TreeItem[];
  label: string;
  trigger: string;
  template: string;
}

export interface ValidateLabel {
  label: string;
}

export interface ValidateTrigger {
  id: string;
  trigger: string;
  tree: TreeItem[];
}

export interface ValidateTemplate {
  template: string;
}

export type ValidationResult =
  | { success: false; error: TriggerError }
  | {
      success: true;
    };

export type ValidatorResult =
  { success: false; errors: FieldError[] } | { success: true };

export type FieldError = {
  field: "label" | "trigger" | "template";
  error: TriggerError;
};
