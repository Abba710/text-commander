import { chromeJSONStorage } from "@/lib/chrome-storage";
import type { EntitlementStore } from "@/types/store-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const STORE_KEY = "entitlement";

export const useEntitlementStore = create<EntitlementStore>()(
  persist(
    (set) => ({
      entitlements: {},
      loaded: false,
      setEntitlements: (entitlements) => set({ entitlements }),
    }),
    {
      name: STORE_KEY,
      storage: chromeJSONStorage,
    },
  ),
);

// sync
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local" || !changes[STORE_KEY]) return;
  useEntitlementStore.persist.rehydrate();
});
