import type { CommandStore } from "@/types/store-types";
import { defaultTree } from "@/consts/defaultCommands";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { chromeJSONStorage } from "@/lib/chrome-storage";

export const STORE_KEY = "commandStore";

export const useCommandStore = create<CommandStore>()(
  persist(
    (set) => ({
      tree: defaultTree,

      setTree: (tree) => set({ tree }),

      addItem: (item) =>
        set((state) => ({
          tree: [...state.tree, item],
        })),
    }),
    {
      name: STORE_KEY,
      storage: chromeJSONStorage,
    },
  ),
);

// Синхронизация между расширением и content script
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local" || !changes[STORE_KEY]) return;
  useCommandStore.persist.rehydrate();
});
