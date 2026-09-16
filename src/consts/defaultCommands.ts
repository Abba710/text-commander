import type { TreeItem } from "@/types/app-types";

export const defaultTree: TreeItem[] = [
  {
    type: "folder",
    id: "0",
    label: "Default",
    description: "this is default commands",
    children: [
      {
        type: "command",
        id: "1",
        label: "Hello dear User",
        trigger: "hi",
        args: ["name"],
        template: "Hello, {name}! This is how commander works.",
      },
    ],
  },
];
