import type { commandStore } from "@/types/store-types";
import { persist } from "zustand/middleware";
import { create } from "zustand";

export const useCommandStore = create<commandStore>()(
  persist(
    (set) => ({
      // commands
      commands: [],
      addCommand: (command) =>
        set((state) => ({ commands: [...state.commands, command] })),
      removeCommand: (id) =>
        set((state) => ({
          commands: state.commands.filter((command) => command.id !== id),
        })),
      updateCommand: (id, command) =>
        set((state) => ({
          commands: state.commands.map((c) => (c.id === id ? command : c)),
        })),

      // Folder
      folders: [],
      addCommandFolder: (folder) =>
        set((state) => ({ folders: [...state.folders, folder] })),

      editCommandFolder: (id, updates) =>
        set((state) => ({
          folders: state.folders.map((f) =>
            f.id === id ? { ...f, ...updates } : f,
          ),
        })),
      removeCommandFolder: (id) =>
        set((state) => ({
          folders: state.folders.filter((f) => f.id !== id),
        })),
    }),
    { name: "commandStore" },
  ),
);
