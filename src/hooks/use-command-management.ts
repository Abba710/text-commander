import type { Command } from "@/types";
import type { validatorResult } from "@/commandengine/types/validator-types/";
import { useCommandStore } from "@/store/commandStore";
import { useCallback } from "react";
import { validator } from "@/commandengine/validator";

export function useCommandManagement() {
  const commands = useCommandStore((state) => state.commands);
  const addCommandToStore = useCommandStore((state) => state.addCommand);

  const addCommand = useCallback(
    (
      label: string,
      trigger: string,
      args: string[],
      template: string,
    ): validatorResult => {
      const validation = validator({ commands, label, trigger, template });
      if (!validation.success) {
        return validation;
      }
      const command: Command = {
        id: crypto.randomUUID(),
        Label: label,
        args,
        trigger,
        template,
        updTime: Date.now(),
      };
      addCommandToStore(command);
      return { success: true };
    },
    [addCommandToStore, commands],
  );

  return {
    commands,
    addCommand,
  };
}
