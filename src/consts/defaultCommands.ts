import type { TreeItem } from "@/types/app-types";

export const defaultTree: TreeItem[] = [
  {
    type: "folder",
    id: "default-folder",
    label: "Default",
    description: "this is default commands",
    children: [],
    commands: [
      {
        type: "command",
        id: "default",
        label: "Hello dear User",
        trigger: "hi",
        args: ["name"],
        template: "Hello, {name}! This is how commander works.",
      },
    ],
  },
];
