"use client";

import { useState } from "react";
import { Hash, Terminal, MessageSquareText, AlertCircle } from "lucide-react";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCommandManagement } from "@/hooks/use-command-management";
import { useNavigate } from "react-router";

export function CommandInput() {
  const navigate = useNavigate();

  const errorMessages = {
    EMPTY: "Field cannot be empty",
    ALREADY_EXISTS: "Trigger already exists. Choose a different one",
  };

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [label, setLabel] = useState("");
  const [trigger, setTrigger] = useState("");
  const [template, setTemplate] = useState("");

  const args = [...template.matchAll(/\{([^{}]+)\}/g)].map((match) => match[1]);
  const previewArgs = [...template.matchAll(/\{([^{}]+)\}/g)].map(
    (match) => match[1],
  );

  const { addCommand } = useCommandManagement();

  const handleSaveClick = () => {
    const result = addCommand(label, trigger, args, template);
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

  const inputBorderClass = {
    true: "border-destructive focus-visible:ring-destructive/20",
    false: "",
  };

  const labelInputClass = `h-11 ${inputBorderClass[String(Boolean(fieldErrors.label)) as "true" | "false"]}`;
  const triggerInputClass = `h-11 pl-6 font-mono ${inputBorderClass[String(Boolean(fieldErrors.trigger)) as "true" | "false"]}`;
  const templateBorderClass = {
    true: "border border-destructive focus-visible:ring-destructive/20",
    false: "",
  };
  const templateInputClass = `min-h-56 max-w-300 resize-none flex-1 ${templateBorderClass[String(Boolean(fieldErrors.template)) as "true" | "false"]}`;

  const hasPreview = Boolean(trigger || template);
  const previewText =
    previewArgs.length > 0
      ? previewArgs.map((arg) => `{${arg}}`).join(" ")
      : template || "Command text will appear here";

  return (
    <div className="flex w-full h-full items-start justify-start px-6">
      <Card className="w-full h-full rounded-2xl border border-border/60 bg-gradient-to-br from-muted/40 to-transparent p-6 flex flex-col gap-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-border/60">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background shrink-0 shadow-sm">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              New Command
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Set a name, trigger, arguments, and the text to be inserted
            </p>
          </div>
          <div className="ml-auto">
            <Button onClick={handleSaveClick} variant="default" size="default">
              Save
            </Button>
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <FieldLabel className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Hash className="h-3.5 w-3.5 text-muted-foreground" />
              Label
            </FieldLabel>
            <Input
              required
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="For example, Greeting"
              className={labelInputClass}
            />
            {fieldErrors.label && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="h-3 w-3" />
                {fieldErrors.label}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
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
                placeholder="command-name"
                className={triggerInputClass}
              />
            </div>
            {fieldErrors.trigger && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="h-3 w-3" />
                {fieldErrors.trigger}
              </p>
            )}
          </div>
        </div>

        {/* Command Text */}
        <div className="flex max-w-full flex-col gap-1.5 flex-1">
          <div className="flex max-w-full items-center justify-between">
            <FieldLabel className="flex max-w-full items-center gap-1.5 text-sm font-medium text-foreground">
              <MessageSquareText className="h-3.5 w-3.5 text-muted-foreground" />
              Text
            </FieldLabel>
            <span className="text-xs text-muted-foreground tabular-nums">
              {template.length} characters
            </span>
          </div>
          <Textarea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            placeholder="Enter the text you want to bind to the command..."
            className={templateInputClass}
          />
          {fieldErrors.template && (
            <p className="flex items-center gap-1 text-xs text-destructive">
              <AlertCircle className="h-3 w-3" />
              {fieldErrors.template}
            </p>
          )}
        </div>

        {/* Preview */}
        {hasPreview && (
          <div className="rounded-xl max-w-300 border border-dashed border-border/70 bg-muted/30 px-4 py-3">
            <p className="text-xs font-medium text-muted-foreground mb-1.5">
              Preview
            </p>
            <div className="flex items-start gap-2 text-sm">
              <span className="font-mono font-medium text-primary shrink-0 rounded-md border border-border/60 bg-background px-1.5 py-0.5">
                /{trigger || "command-name"}
              </span>
              <span className="text-muted-foreground truncate pt-0.5">
                {previewText}
              </span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
