import type { CommandPreviewProps } from "@/types/app-types";

export function CommandPreview({
  hasPreview,
  trigger,
  previewArgs,
}: CommandPreviewProps) {
  const previewText =
    previewArgs.length > 0
      ? previewArgs.map((arg) => `{${arg}}`).join(" ")
      : "Command arguments will appear here";
  return (
    <>
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
    </>
  );
}
