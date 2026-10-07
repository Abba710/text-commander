import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandAutoCompleteInput,
} from "@/components/ui/command";
import { KbdGroup, Kbd } from "@/components/ui/kbd";
import { useSearch } from "@/hooks/use-search";
import type { Command as CommandType } from "@/types/app-types";
import { SearchX, TerminalSquare } from "lucide-react";
import { useEffect, useState } from "react";

export function AutoComplete({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const searchQueue = useSearch();
  const isCommandMode = value.includes("/");
  const [activeCommand, setActiveCommand] = useState<CommandType | null>(null);
  const [trigger, setTrigger] = useState("");

  useEffect(() => {
    if (!isCommandMode) return;

    const start = value.lastIndexOf("/");
    const end = value.indexOf(" ", start);
    setTrigger(value.slice(start, end === -1 ? value.length : end));
    console.log("trigger: ", trigger, "command: ", activeCommand);
  }, [value, isCommandMode]);

  return (
    <>
      {isCommandMode && (
        <Command>
          <CommandAutoCompleteInput
            value={trigger}
            className=" absolute size-0 opacity-0"
          />

          <CommandList className="max-h-[200px]">
            <CommandEmpty className="h-5! flex items-center justify-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <SearchX className="size-4 opacity-50" />
                <span className="text-sm">No results found.</span>
              </div>
            </CommandEmpty>

            {searchQueue.flattenedCommands.length > 0 && (
              <CommandGroup>
                {searchQueue.flattenedCommands.map((command) => (
                  <CommandItem
                    key={command.id}
                    value={`${command.id} ${command.trigger} ${command.args}`}
                    onSelect={() => setActiveCommand(command)}
                    className="gap-1"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md border bg-muted/50">
                      <TerminalSquare className="size-3.5 text-muted-foreground" />
                    </span>

                    <div className="flex min-w-0 items-center gap-2">
                      <span className="truncate text-sm">
                        {command.trigger}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {command.args.map((arg) => `${arg}`).join(" ")}
                      </span>
                    </div>

                    <CommandShortcut className="font-mono">
                      {command.label}
                    </CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
          <div className="border-t p-2">
            <div className="flex gap-2 text-xs text-muted-foreground">
              <KbdGroup>
                <Kbd>↑↓</Kbd>
                <span>Navigate</span>

                <Kbd>Enter</Kbd>
                <span>Select</span>

                <Kbd>Tab</Kbd>
                <span>navigate between arguments</span>

                <Kbd>Esc</Kbd>
                <span>Close</span>
              </KbdGroup>
            </div>
          </div>
        </Command>
      )}
      {children}
    </>
  );
}
