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

import { Folder } from "lucide-react";
import { useSearch } from "@/hooks/use-search";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const navigate = useNavigate();

  const searchQueue = useSearch();

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

          {searchQueue.flatCommands.length > 0 && (
            <CommandGroup heading="Commands">
              {searchQueue.flatCommands.map((command) => (
                <CommandItem
                  key={command.id}
                  value={`${command.id} ${command.label} ${command.trigger} ${command.template}`}
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

          {searchQueue.flatCommands.length > 0 &&
            searchQueue.flatFolders.length > 0 && <CommandSeparator />}

          {searchQueue.flatFolders.length > 0 && (
            <CommandGroup
              className="flex flex-col gap-2 justify-start"
              heading="Folders"
            >
              {searchQueue.flatFolders.map((folder) => (
                <CommandItem
                  key={folder.id}
                  value={`${folder.id} ${folder.label} ${folder.description}`}
                  onSelect={() =>
                    runCommand(() => navigate(`/edit-folder/${folder.id}`))
                  }
                >
                  <span className="flex gap-1 items-center">
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
