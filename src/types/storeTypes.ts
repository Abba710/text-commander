import type { Command } from "./types";

export interface commandStore {
  commands: Command[];
  addCommand: (command: Command) => void;
  removeCommand: (id: string) => void;
  updateCommand: (id: string, command: Command) => void;
}
