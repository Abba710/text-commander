export interface Command {
  id: string;
  Label: string;
  trigger: string;
  args: string[];
  template: string;
  updTime?: number;
}

export interface CommandFolder {
  id: string;
  Label: string;
  children: CommandFolder[];
  commands: Command[];
}

export interface Tree {
  commands: Command[];
  commandFolders?: CommandFolder[];
}
