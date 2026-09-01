import type { Command, CommandFolder } from "./app-types";

export interface commandStore {
  commands: Command[];
  folders: CommandFolder[];
  addCommand: (command: Command) => void;
  addCommandFolder: (folder: CommandFolder) => void;
  removeCommand: (id: string) => void;
  updateCommand: (id: string, command: Command) => void;
}
