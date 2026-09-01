"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useNavigate } from "react-router";
import { useCommandManagement } from "@/hooks/use-command-management";
import { useFolderManagement } from "@/hooks/use-folder-management";
import { Folder } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const navigate = useNavigate();

  const { commands } = useCommandManagement();
  const { folders } = useFolderManagement();

  const runCommand = (callback: () => void) => {
    onClose();
    callback();
  };
  if (!isOpen) return null;

  return (
    <Command>
      <CommandDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <CommandInput placeholder="Search commands and folders..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {commands.length > 0 && (
            <CommandGroup heading="Commands">
              {commands.map((command) => (
                <CommandItem
                  key={command.id}
                  value={`${command.label} ${command.trigger}`}
                  onSelect={() =>
                    runCommand(() => {
                      navigate(`/edit-command/${command.id}`);
                    })
                  }
                >
                  <span className="font-mono text-primary">
                    /{command.trigger}
                  </span>
                  <span className="text-muted-foreground">{command.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {commands.length > 0 && folders.length > 0 && <CommandSeparator />}

          {folders.length > 0 && (
            <CommandGroup heading="Folders">
              {folders.map((folder) => (
                <CommandItem
                  key={folder.id}
                  value={folder.label}
                  onSelect={() =>
                    runCommand(() => navigate(`/folders/${folder.id}`))
                  }
                >
                  <span>
                    <Folder />
                    {folder.label}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </Command>
  );
}
