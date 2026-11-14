import { createJSONStorage } from "zustand/middleware";
import type { SupportedStorage } from "@supabase/supabase-js";

export const chromeStorage: SupportedStorage = {
  getItem: async (name: string) => {
    const res = await chrome.storage.local.get<Record<string, string>>(name);
    return res[name] ?? null;
  },
  setItem: async (name: string, value: string) => {
    await chrome.storage.local.set({ [name]: value });
  },
  removeItem: async (name: string) => {
    await chrome.storage.local.remove(name);
  },
};

export const chromeJSONStorage = createJSONStorage(() => chromeStorage);
