import type { Command, CommandFolder } from "@/types/app-types";
import type { ValidatorResult } from "@/types/validator-types";
import { useCommandStore } from "@/store/commandStore";
import { useCallback } from "react";
import { validator } from "@/domain/command/validator/validator";
import { useNavigate } from "react-router";
import { findItemInTree } from "@/domain/command/tree/find-item-in-tree";
import {
  editCommandInTree,
  editFolderInTree,
} from "@/domain/command/tree/edit-item-in-tree";
import { removeById } from "@/domain/command/tree/remove-by-id";

export function useTreeManagement() {
  const tree = useCommandStore((state) => state.tree);
  const setTree = useCommandStore((state) => state.setTree);
  const addItem = useCommandStore((state) => state.addItem);

  const navigate = useNavigate();

  // General Management
  const findItem = useCallback(
    (id: string) => {
      return findItemInTree(id, tree);
    },
    [tree],
  );

  const removeTreeItem = useCallback(
    (id: string, currentItemId: string | undefined) => {
      const updatedTree = removeById(id, tree);
      setTree(updatedTree);
      if (id === currentItemId) {
        navigate("/");
      }
    },
    [navigate, setTree, tree],
  );

  // Command management
  const addCommand = useCallback(
    (
      label: string,
      trigger: string,
      args: string[],
      template: string,
    ): ValidatorResult => {
      const id = crypto.randomUUID();
      // Validate the command
      const validation = validator({ id, tree, label, trigger, template });
      if (!validation.success) {
        return validation;
      }
      // Create the command
      const command: Command = {
        type: "command",
        id: id,
        label,
        args,
        trigger,
        template,
        updTime: Date.now(),
      };
      addItem(command);
      return { success: true };
    },
    [addItem, tree],
  );

  const editCommand = useCallback(
    (command: Command): ValidatorResult => {
      const existingCommand = findItem(command.id);

      // If the command doesn't exist, return an error
      if (!existingCommand) {
        return { success: false, errors: [] };
      }
      // Check if there are any changes
      if (existingCommand.type === "command") {
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
          tree,
          label: command.label,
          trigger: command.trigger,
          template: command.template,
        });

        if (!validation.success) {
          return validation;
        }

        // Update the command in the store
        const newTree = editCommandInTree(tree, command.id, command);
        setTree(newTree);

        return { success: true };
      }
      return { success: false, errors: [] };
    },
    [tree, findItem, setTree],
  );

  // folder management
  const addFolder = useCallback(
    (label: string, description: string) => {
      const folder: CommandFolder = {
        type: "folder",
        id: crypto.randomUUID(),
        label: label || "new folder",
        description: description ?? "",
        children: [],
      };
      addItem(folder);
    },
    [addItem],
  );

  const editFolder = useCallback(
    (id: string, newLabel: string, newDescription: string) => {
      const existingFolder = findItem(id);

      if (!existingFolder || existingFolder.type !== "folder") {
        return { success: false };
      }

      const hasChanges =
        newLabel !== existingFolder.label ||
        newDescription !== existingFolder.description;

      if (!hasChanges) {
        return { success: true };
      }

      const updatedFolder = {
        ...existingFolder,
        label: newLabel,
        description: newDescription,
      };

      const newTree = editFolderInTree(tree, id, updatedFolder);
      setTree(newTree);

      return { success: true };
    },
    [tree, setTree],
  );

  return {
    tree,
    addCommand,
    findItem,
    editCommand,
    removeTreeItem,
    addFolder,
    editFolder,
  };
}
