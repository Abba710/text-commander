export interface Command {
  id: string;
  label: string;
  trigger: string;
  args: string[];
  template: string;
  updTime?: number;
}

export interface CommandFolder {
  id: string;
  label: string;
  description: string;
  children: CommandFolder[];
  commands: Command[];
}

export interface Tree {
  commands: Command[];
  commandFolders?: CommandFolder[];
}

export type BreadcrumbHandle = {
  crumb: string;
};

export interface CommandLeafProps {
  command: Command;
  onDeleteCommand: (commandId: string) => void;
}

export interface CommandFolderNodeProps {
  folder: CommandFolder;
  onDeleteCommand: (commandId: string) => void;
  onDeleteFolder: (folderId: string) => void;
}
