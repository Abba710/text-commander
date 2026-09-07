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
  CommandShortcut,
} from "@/components/ui/command";
import { useNavigate } from "react-router";
import { Folder, SearchX, TerminalSquare } from "lucide-react";
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
        <CommandList className="max-h-[420px]">
          <CommandEmpty className="py-8">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <SearchX className="size-8 opacity-50" />
              <span className="text-sm">No results found.</span>
            </div>
          </CommandEmpty>

          {searchQueue.flatCommands.length > 0 && (
            <CommandGroup heading="Commands">
              {searchQueue.flatCommands.map((command) => (
                <CommandItem
                  key={command.id}
                  value={`${command.id} ${command.label}`}
                  onSelect={() =>
                    runCommand(() => {
                      navigate(`/edit-command/${command.id}`);
                    })
                  }
                  className="gap-2"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md border bg-muted/50">
                    <TerminalSquare className="size-3.5 text-muted-foreground" />
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm">{command.label}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      /{command.trigger}
                    </span>
                  </div>
                  <CommandShortcut className="font-mono">
                    /{command.trigger}
                  </CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {searchQueue.flatCommands.length > 0 &&
            searchQueue.flatFolders.length > 0 && <CommandSeparator />}

          {searchQueue.flatFolders.length > 0 && (
            <CommandGroup heading="Folders">
              {searchQueue.flatFolders.map((folder) => (
                <CommandItem
                  key={folder.id}
                  value={`${folder.id} ${folder.label} ${folder.description}`}
                  onSelect={() =>
                    runCommand(() => navigate(`/edit-folder/${folder.id}`))
                  }
                  className="gap-2"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md border bg-muted/50">
                    <Folder className="size-3.5 text-muted-foreground" />
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm">{folder.label}</span>
                    {folder.description && (
                      <span className="truncate text-xs text-muted-foreground">
                        {folder.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </Command>
  );
}
