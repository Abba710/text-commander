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
import type { Command as CommandType, FieldTypes } from "@/types/app-types";
import { SearchX, TerminalSquare } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useKbrd } from "@/hooks/use-kbrd";

export function AutoComplete({
  value,
  field,
  setValue,
}: {
  value: string;
  field: FieldTypes;
  setValue: (value: string) => void;
}) {
  const searchQueue = useSearch();
  const isCommandMode = value.includes("#");
  const [trigger, setTrigger] = useState("");
  const commandRef = useRef<HTMLDivElement>(null);
  useKbrd(commandRef, field, isCommandMode);

  // Пользователь выбирает /команда
  const handleOnActive = (value: string, selected: CommandType) => {
    const argsLenght = selected.args.length;
    function setFieldCrursor(f: FieldTypes, text: string) {
      if (f instanceof HTMLInputElement || f instanceof HTMLTextAreaElement) {
        const end = text.length;
        f.setSelectionRange(end, end);
      } else {
        const selection = window.getSelection();
        selection?.modify("move", "forward", "documentBoundary");
      }
    }

    // Если аргументов нет
    if (argsLenght < 1) {
      const replacedText = value.replace(/#\S*/, selected.template);
      setValue(replacedText);
      setFieldCrursor(field, replacedText);
      return;
    } else {
      const insertedCommand = value.match(
        new RegExp(`^#\\S+(?:\\s+\\S+){${argsLenght}}`),
      )?.[0];

      // Если есть аргументы но они не введены
      if (!insertedCommand) {
        const newValue = value.replace(/#\S*/, selected.trigger + " ");
        setValue(newValue);
        setFieldCrursor(field, newValue);
        return;
      }

      // Если аргументы введены
      const parts = insertedCommand.trim().split(/\s+/);
      const args = parts.slice(1);
      const resolvedTemplate = selected.template.replace(
        /\{[^}]+\}/g,
        () => args.shift() ?? "",
      );

      setValue(value.replace(insertedCommand, resolvedTemplate));
      setFieldCrursor(field, resolvedTemplate);
      return;
    }
  };

  useEffect(() => {
    if (!isCommandMode) return;
    console.log("command mode works");
    const start = value.lastIndexOf("#");
    const end = value.indexOf(" ", start);
    setTrigger(value.slice(start, end === -1 ? value.length : end));
  }, [value, isCommandMode]);

  return (
    <>
      {isCommandMode && (
        <Command ref={commandRef} loop>
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
                    onSelect={() => {
                      handleOnActive(value, command);
                    }}
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

                <Kbd>Esc</Kbd>
                <span>Close</span>
              </KbdGroup>
            </div>
          </div>
        </Command>
      )}
    </>
  );
}
