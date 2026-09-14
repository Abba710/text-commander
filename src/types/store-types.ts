import type { TreeItem } from "./app-types";

export interface CommandStore {
  tree: TreeItem[];

  setTree: (tree: TreeItem[]) => void;
  addItem: (item: TreeItem) => void;
  removeItem: (id: string) => void;
}
