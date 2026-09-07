import { Sparkles, Wand2, ArrowRight } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Card } from "../ui/card";

export function MainTest() {
  const navigate = useNavigate();

  return (
    <div
      data-debug="main test component"
      className="flex w-full h-full items-start justify-start px-6"
    >
      <Card className="w-full rounded-2xl border border-border/60 bg-gradient-to-br from-muted/40 to-transparent p-6 flex flex-col gap-6 shadow-sm">
        <Field>
          {/* Header */}
          <div className="flex items-center gap-3 pb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background shrink-0 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-1">
              <FieldLabel
                htmlFor="textarea-message"
                className="text-2xl font-semibold tracking-tight"
              >
                Welcome to Text Commander
              </FieldLabel>
              <FieldDescription>
                Try out your commands below. Type{" "}
                <kbd className="inline-flex items-center rounded-md border border-border/60 bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-foreground shadow-sm">
                  /hi
                </kbd>{" "}
                to see one in action.
              </FieldDescription>
            </div>
          </div>

          {/* Test area */}
          <Textarea
            id="textarea-message"
            placeholder="Type your message here."
            className="min-h-56 resize-none rounded-xl border-border/60 bg-background/60 shadow-sm transition-shadow focus-visible:shadow-md"
          />
          <FieldDescription>
            Commands insert snippets and work on any website. Right-click any
            text field to pick a snippet from the context menu.
          </FieldDescription>

          {/* Create command CTA */}
          <div className="group flex items-center justify-between gap-4 rounded-xl border border-dashed border-border/70 bg-muted/30 px-4 py-3 mt-1 transition-colors hover:border-border hover:bg-muted/50">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border border-border/60 shrink-0">
                <Wand2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <FieldLabel
                htmlFor="textarea-message"
                className="text-base font-medium"
              >
                Create a new command now
              </FieldLabel>
            </div>
            <Button
              variant="default"
              size="lg"
              className="gap-1.5"
              onClick={() => navigate("/add-command")}
            >
              Add Command
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </Field>
      </Card>
    </div>
  );
}
