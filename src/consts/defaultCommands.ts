import type { TreeItem } from "@/types/app-types";

export const defaultTree: TreeItem[] = [
  {
    type: "folder",
    id: "0",
    label: "Default commands",
    description: "this is default commands",
    children: [
      {
        type: "command",
        id: "1",
        label: "Command with one argument",
        trigger: "#greeting",
        args: ["name"],
        template: "Hello, {name}! Welcome back.",
      },
      {
        type: "command",
        id: "2",
        label: "Command with multiple arguments",
        trigger: "#meeting",
        args: ["name", "date", "time"],
        template: "Hi {name}, our meeting is on {date} at {time}.",
      },
    ],
  },
];
