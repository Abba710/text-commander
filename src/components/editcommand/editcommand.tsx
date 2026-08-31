"use client";

import { useState } from "react";
import { Hash, Terminal, MessageSquareText } from "lucide-react";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCommandManagement } from "@/hooks/use-command-management";
import { useNavigate, useParams } from "react-router";
import { NotFound } from "@/page/404";
import { useEffect } from "react";

export function EditCommand() {
  const { findCommand, editCommand } = useCommandManagement();

  const { id } = useParams();

  if (!id) return <NotFound />;
  const command = findCommand(id);
  if (!command) return <NotFound />;

  useEffect(() => {
    setFieldErrors({});
    setLabel(command.label);
    setTrigger(command.trigger);
    setTemplate(command.template);
  }, [id, command]);

  const navigate = useNavigate();

  const errorMessages = {
    EMPTY: "Field cannot be empty",
    ALREADY_EXISTS: "Trigger already exists. Choose a different one",
  };

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [label, setLabel] = useState(command?.label ?? "");
  const [trigger, setTrigger] = useState(command?.trigger ?? "");
  const [template, setTemplate] = useState(command?.template ?? "");

  const args = [...template.matchAll(/\{([^{}]+)\}/g)].map((match) => match[1]);
  const previewArgs = [...template.matchAll(/\{([^{}]+)\}/g)].map(
    (match) => match[1] + " ",
  );
  const handleSaveClick = () => {
    const result = editCommand({ id, label, trigger, args, template });
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const { field, error } of result.errors) {
        next[field] = errorMessages[error];
      }
      setFieldErrors(next);
    } else {
      setFieldErrors({});
      navigate("/");
    }
  };

  if (!command) {
    return <NotFound />;
  }
  return (
    <div className="flex w-full h-full items-start justify-start px-6">
      <Card className="w-full h-full rounded-2xl border border-border/60 from-muted/40 to-transparent p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-border/60">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold leading-none">
              Edit Command {command.label}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Set a name, trigger, arguments, and the text to be inserted
            </p>
          </div>
          <div className="ml-auto">
            <Button
              onClick={() => {
                handleSaveClick();
              }}
              variant="default"
              size="default"
            >
              Save
            </Button>
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <FieldLabel className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Hash className="h-3.5 w-3.5 text-muted-foreground" />
              Label
            </FieldLabel>
            <Input
              required
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder={fieldErrors.label ?? "For example, Greeting"}
              className={`h-11 ${fieldErrors.label ? "border-red-500" : ""}`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
              Trigger
            </FieldLabel>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-mono text-muted-foreground">
                /
              </span>
              <Input
                required
                value={trigger}
                onChange={(e) =>
                  setTrigger(
                    e.target.value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(),
                  )
                }
                placeholder={fieldErrors.trigger ?? "command-name"}
                className={`h-11 pl-6 font-mono ${fieldErrors.trigger ? "border-red-500" : ""}`}
              />
            </div>
          </div>
        </div>

        {/* Command Text */}
        <div className="flex max-w-full flex-col gap-2 flex-1">
          <div className="flex max-w-full items-center justify-between">
            <FieldLabel className="flex max-w-full items-center gap-1.5 text-sm font-medium text-foreground">
              <MessageSquareText className="h-3.5 w-3.5 text-muted-foreground" />
              Template
            </FieldLabel>
            <span className="text-xs text-muted-foreground tabular-nums">
              {template.length} characters
            </span>
          </div>
          <Textarea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            placeholder={`${fieldErrors.template ?? "Enter the text you want to bind to the command..."}`}
            className={`min-h-56 max-w-300 resize-none flex-1 ${fieldErrors.template ? "border border-red-500" : ""}`}
          />
        </div>

        {/* Preview */}
        {(trigger || template) && (
          <div className="rounded-xl max-w-300 border border-dashed border-border/70 bg-muted/30 px-4 py-3">
            <p className="text-xs font-medium text-muted-foreground mb-1.5">
              Preview
            </p>
            <div className="flex items-start gap-2 text-sm">
              <span className="font-mono font-medium text-primary shrink-0">
                /{trigger || "command-name"}
              </span>
              <span className="text-muted-foreground truncate">
                {previewArgs || "Command text will appear here"}
              </span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
