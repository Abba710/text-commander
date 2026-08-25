import type { Command } from "@/types";

export type TriggerError = "EMPTY" | "ALREADY_EXISTS";

export interface validatorInput {
  id: string;
  commands: Command[];
  label: string;
  trigger: string;
  template: string;
}

export interface validateLabel {
  label: string;
}

export interface validateTrigger {
  id: string;
  trigger: string;
  commands: Command[];
}

export interface validateTemplate {
  template: string;
}

export type validationResult =
  | { success: false; error: TriggerError }
  | {
      success: true;
    };

export type validatorResult =
  { success: false; errors: FieldError[] } | { success: true };

export type FieldError = {
  field: "label" | "trigger" | "template";
  error: TriggerError;
};
