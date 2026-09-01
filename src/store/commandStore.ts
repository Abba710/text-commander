import type { commandStore } from "@/types/store-types";
import { persist } from "zustand/middleware";
import { create } from "zustand";

export const useCommandStore = create<commandStore>()(
  persist(
    (set) => ({
      commands: [],
      folders: [],
      addCommand: (command) =>
        set((state) => ({ commands: [...state.commands, command] })),
      addCommandFolder: (folder) =>
        set((state) => ({ folders: [...state.folders, folder] })),
      removeCommand: (id) =>
        set((state) => ({
          commands: state.commands.filter((command) => command.id !== id),
        })),
      updateCommand: (id, command) =>
        set((state) => ({
          commands: state.commands.map((c) => (c.id === id ? command : c)),
        })),
    }),
    { name: "commandStore" },
  ),
);
