import { ArrowDown, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export type Part = { kind: "text" | "arg"; text: string };

export type BaseExample = {
  id: string;
  title: string;
  inputTrigger: string;
  inputArgs: string[];
  resultParts: Part[];
};

export const sectionClass =
  "flex flex-col gap-4 rounded-lg border border-dashed border-border/60 bg-gradient-to-br from-muted/40 to-transparent p-4";

export const titleClass = "text-sm font-semibold";
export const subtitleClass = "text-xs text-muted-foreground";
export const listClass = "flex flex-col gap-2 text-sm";

export const previewClass =
  "flex flex-col gap-4 rounded-md border border-border/60 bg-background p-4 text-sm";
export const blockClass = "flex flex-col gap-2";
export const commandBoxClass = "rounded-md bg-muted/50 p-3 leading-relaxed";
export const inputBoxClass =
  "flex flex-wrap items-center gap-1.5 rounded-md bg-muted/50 p-3";
export const resultBoxClass =
  "rounded-md bg-emerald-500/10 p-3 font-medium leading-relaxed";

export const triggerClass =
  "rounded bg-sky-500/15 px-1 py-0.5 font-mono text-xs text-sky-600 dark:text-sky-400";

export const argClass =
  "rounded bg-amber-500/15 px-1 py-0.5 font-mono text-xs text-amber-600 dark:text-amber-400";

export const partClass = {
  text: "",
  arg: argClass,
};

export const stepClass = {
  command: "bg-muted text-foreground",
  type: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  result: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
};

const dotClass = {
  trigger: "bg-sky-500",
  value: "bg-amber-500",
};

const tabBaseClass =
  "rounded px-2.5 py-1 text-center text-xs font-medium transition ";

const tabClass = {
  true: "bg-background text-foreground shadow-sm",
  false: "text-muted-foreground hover:text-foreground",
};

const linkClass =
  buttonVariants({ variant: "default", size: "sm" }) + " w-fit gap-1.5";

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
      {children}
    </code>
  );
}

export function PartsText({ parts }: { parts: Part[] }) {
  return (
    <>
      {parts.map((part, index) => (
        <span key={index} className={partClass[part.kind]}>
          {part.text}
        </span>
      ))}
    </>
  );
}

export function TypedLine({
  trigger,
  args,
}: {
  trigger: string;
  args: string[];
}) {
  return (
    <p className={inputBoxClass}>
      <span className={triggerClass}>{trigger}</span>
      {args.map((arg, index) => (
        <span key={index} className={argClass}>
          {arg}
        </span>
      ))}
    </p>
  );
}

export function FlowArrow() {
  return (
    <div className="flex justify-center text-muted-foreground">
      <ArrowDown className="size-4" />
    </div>
  );
}

function LegendItem({
  kind,
  label,
}: {
  kind: "trigger" | "value";
  label: string;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={"size-2 rounded-full " + dotClass[kind]} />
      {label}
    </span>
  );
}

export function Legend() {
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <LegendItem kind="trigger" label="Trigger" />
      <LegendItem kind="value" label="Value" />
    </div>
  );
}

type TabItem = { id: string; title: string };

export function ExampleTabs({
  items,
  activeId,
  onChange,
}: {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="grid w-full grid-flow-col auto-cols-fr gap-1 rounded-md bg-muted p-1">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={
            tabBaseClass +
            tabClass[String(item.id === activeId) as "true" | "false"]
          }
        >
          {item.title}
        </button>
      ))}
    </div>
  );
}

export function MoreLink({ href = "#" }: { href?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={linkClass}>
      More tips and ideas
      <ExternalLink className="size-3.5" />
    </a>
  );
}
