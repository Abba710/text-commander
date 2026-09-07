import type { Command } from "@/types/app-types";

export const defaultCommands: Command[] = [
  {
    id: "default",
    label: "Hello dear User",
    trigger: "hi",
    args: ["name"],
    template: "Hello, {name}! This is how commander works.",
  },
];
