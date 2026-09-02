import type { Command, CommandFolder } from "./app-types";

export interface commandStore {
  commands: Command[];
  addCommand: (command: Command) => void;
  removeCommand: (id: string) => void;
  updateCommand: (id: string, command: Command) => void;

  folders: CommandFolder[];
  addCommandFolder: (folder: CommandFolder) => void;
  editCommandFolder: (id: string, updates: Partial<CommandFolder>) => void;
}
