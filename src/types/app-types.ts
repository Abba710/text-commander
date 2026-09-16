export type TreeItem = Command | CommandFolder;

export interface Command {
  type: "command";
  id: string;
  label: string;
  trigger: string;
  args: string[];
  template: string;
  updTime?: number;
}

export interface CommandFolder {
  type: "folder";
  id: string;
  label: string;
  description: string;
  children: TreeItem[];
  updTime?: number;
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
  onEditCommand: (commandId: string) => void;
  onDeleteCommand: (commandId: string) => void;
}

export interface CommandFolderNodeProps {
  folder: CommandFolder;
  onEditCommand: (commandId: string) => void;
  onEditFolder: (folderId: string) => void;
  onDeleteCommand: (commandId: string) => void;
  onDeleteFolder: (folderId: string) => void;
}

export interface CommandPreviewProps {
  hasPreview: boolean;
  trigger: string;
  previewArgs: string[];
}
