"use client";

import { useState } from "react";
import { Hash, Terminal, MessageSquareText } from "lucide-react";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

export function CommandInput() {
  const [label, setLabel] = useState("");
  const [trigger, setTrigger] = useState("");
  const [text, setText] = useState("");

  return (
    <div className="flex w-full h-full items-start justify-start px-6">
      <div className="w-full h-full rounded-2xl border border-border/60 bg-background from-muted/40 to-transparent p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-border/60">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold leading-none">New Command</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Set a name, trigger, arguments, and the text to be inserted
            </p>
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
              placeholder="For example, Greeting"
              className="h-11"
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
                  setTrigger(e.target.value.replace(/\s/g, "-").toLowerCase())
                }
                placeholder="command-name"
                className="h-11 pl-6 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Command Text */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center justify-between">
            <FieldLabel className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <MessageSquareText className="h-3.5 w-3.5 text-muted-foreground" />
              Text
            </FieldLabel>
            <span className="text-xs text-muted-foreground tabular-nums">
              {text.length} characters
            </span>
          </div>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text you want to bind to the command..."
            className="min-h-56 resize-none flex-1"
          />
        </div>

        {/* Preview */}
        {(trigger || text) && (
          <div className="rounded-xl border border-dashed border-border/70 bg-muted/30 px-4 py-3">
            <p className="text-xs font-medium text-muted-foreground mb-1.5">
              Preview
            </p>
            <div className="flex items-start gap-2 text-sm">
              <span className="font-mono font-medium text-primary shrink-0">
                /{trigger || "command-name"}
              </span>
              <span className="text-muted-foreground truncate">
                {text || "Command text will appear here"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
