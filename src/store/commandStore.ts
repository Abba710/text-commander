import type { CommandStore } from "@/types/store-types";
import { defaultTree } from "@/consts/defaultCommands";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCommandStore = create<CommandStore>()(
  persist(
    (set) => ({
      tree: defaultTree,

      setTree: (tree) => set({ tree }),

      addItem: (item) =>
        set((state) => ({
          tree: [...state.tree, item],
        })),

      removeItem: (id) =>
        set((state) => ({
          tree: state.tree.filter((item) => item.id !== id),
        })),
    }),
    { name: "commandStore" },
  ),
);
