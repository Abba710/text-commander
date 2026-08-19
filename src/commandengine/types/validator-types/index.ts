import type { Command } from "@/types";

export type TriggerError = "EMPTY" | "ALREADY_EXISTS" | "INVALID_FORMAT";

export interface validatorInput {
  commands: Command[];
  label: string;
  trigger: string;
  template: string;
}

export interface validateLabel {
  label: string;
}

export interface validateTrigger {
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
  | {
      success: false;
      field: "label" | "trigger" | "template";
      error: TriggerError;
    }
  | { success: true };
