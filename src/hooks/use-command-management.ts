import type { Command } from "@/types/app-types";
import type { validatorResult } from "@/types/validator-types";
import { useCommandStore } from "@/store/commandStore";
import { useCallback } from "react";
import { validator } from "@/domain/validator/validator";
import { useNavigate } from "react-router";

export function useCommandManagement() {
  const commands = useCommandStore((state) => state.commands);
  const addCommandToStore = useCommandStore((state) => state.addCommand);
  const editCommandInStore = useCommandStore((state) => state.updateCommand);
  const navigate = useNavigate();
  const removeCommandFromStore = useCommandStore(
    (state) => state.removeCommand,
  );

  const addCommand = useCallback(
    (
      label: string,
      trigger: string,
      args: string[],
      template: string,
    ): validatorResult => {
      const id = crypto.randomUUID();
      // Validate the command
      const validation = validator({ id, commands, label, trigger, template });
      if (!validation.success) {
        return validation;
      }
      // Create the command
      const command: Command = {
        id: id,
        label,
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

  const findCommand = useCallback(
    (id: string) => {
      return commands.find((c: Command) => c.id === id);
    },
    [commands],
  );

  const editCommand = useCallback(
    (command: Command): validatorResult => {
      const existingCommand = commands.find(
        (c: Command) => c.id === command.id,
      );

      // If the command doesn't exist, return an error
      if (!existingCommand) {
        return { success: false, errors: [] };
      }

      // Check if there are any changes
      const hasChanges =
        command.label !== existingCommand.label ||
        command.trigger !== existingCommand.trigger ||
        command.template !== existingCommand.template;

      // If there are no changes, return success
      if (!hasChanges) {
        return { success: true };
      }

      // Validate the command
      const validation = validator({
        id: command.id,
        commands,
        label: command.label,
        trigger: command.trigger,
        template: command.template,
      });

      if (!validation.success) {
        return validation;
      }

      // Update the command in the store
      editCommandInStore(command.id, {
        ...command,
        updTime: Date.now(),
      });

      return { success: true };
    },
    [commands, editCommandInStore],
  );

  const deleteCommand = useCallback(
    (id: string, currentCommandId: string | undefined) => {
      removeCommandFromStore(id);
      if (id === currentCommandId) {
        navigate("/");
      }
    },
    [removeCommandFromStore, navigate],
  );

  return {
    commands,
    addCommand,
    findCommand,
    editCommand,
    deleteCommand,
  };
}
