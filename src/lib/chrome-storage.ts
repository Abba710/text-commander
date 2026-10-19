// lib/chrome-storage.ts
import { createJSONStorage, type StateStorage } from "zustand/middleware";

const chromeStorage: StateStorage = {
  getItem: async (name) => {
    const res = await chrome.storage.local.get<Record<string, string>>(name);
    return res[name] ?? null;
  },
  setItem: async (name, value) => {
    await chrome.storage.local.set({ [name]: value });
  },
  removeItem: async (name) => {
    await chrome.storage.local.remove(name);
  },
};

export const chromeJSONStorage = createJSONStorage(() => chromeStorage);
