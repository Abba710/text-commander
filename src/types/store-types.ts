import type { TreeItem } from "./app-types";
import type { UserPermissions } from "@/types/user-types";

export interface CommandStore {
  tree: TreeItem[];

  setTree: (tree: TreeItem[]) => void;
  addItem: (item: TreeItem) => void;
}

export interface EntitlementStore {
  entitlements: UserPermissions;
  loaded: boolean;
  setEntitlements: (data: UserPermissions) => void;
}
