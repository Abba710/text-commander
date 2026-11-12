import { useState } from "react";
import {
  Code,
  ExampleTabs,
  FlowArrow,
  Legend,
  MoreLink,
  PartsText,
  TypedLine,
  blockClass,
  commandBoxClass,
  listClass,
  previewClass,
  resultBoxClass,
  sectionClass,
  stepClass,
  subtitleClass,
  titleClass,
} from "@/components/guide/guide-shared";
import type { BaseExample, Part } from "@/components/guide/guide-shared";

type Example = BaseExample & { parts: Part[] };

const examples: Example[] = [
  {
    id: "one",
    title: "One argument",
    parts: [
      { kind: "text", text: "Hello, " },
      { kind: "arg", text: "{name}" },
      { kind: "text", text: "! Welcome back." },
    ],
    inputTrigger: "#greeting",
    inputArgs: ["Alex"],
    resultParts: [
      { kind: "text", text: "Hello, " },
      { kind: "arg", text: "Alex" },
      { kind: "text", text: "! Welcome back." },
    ],
  },
  {
    id: "many",
    title: "Multiple arguments",
    parts: [
      { kind: "text", text: "Hi " },
      { kind: "arg", text: "{name}" },
      { kind: "text", text: ", our meeting is on " },
      { kind: "arg", text: "{date}" },
      { kind: "text", text: " at " },
      { kind: "arg", text: "{time}" },
      { kind: "text", text: "." },
    ],
    inputTrigger: "#meeting",
    inputArgs: ["Alex", "Monday", "10:00"],
    resultParts: [
      { kind: "text", text: "Hi " },
      { kind: "arg", text: "Alex" },
      { kind: "text", text: ", our meeting is on " },
      { kind: "arg", text: "Monday" },
      { kind: "text", text: " at " },
      { kind: "arg", text: "10:00" },
      { kind: "text", text: "." },
    ],
  },
];

const title = "How commands work";

const ruleListClass = listClass + " text-muted-foreground";

function Rules() {
  return (
    <ul className={ruleListClass}>
      <li>
        Give the command a label, for example <Code>Greeting</Code>.
      </li>
      <li>
        Set a trigger. It must start with <Code>#</Code>.
      </li>
      <li>
        Add arguments in curly brackets, for example <Code>{"{name}"}</Code>.
      </li>
    </ul>
  );
}

function StepBadge({
  kind,
  number,
  label,
}: {
  kind: "command" | "type" | "result";
  number: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={
          "flex size-5 items-center justify-center rounded-full text-[10px] font-bold " +
          stepClass[kind]
        }
      >
        {number}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function ExamplePreview({ example }: { example: Example }) {
  return (
    <div className={previewClass}>
      <div className={blockClass}>
        <StepBadge kind="command" number="1" label="Command text (you save)" />
        <p className={commandBoxClass}>
          <PartsText parts={example.parts} />
        </p>
        <p className={subtitleClass}>
          Highlighted parts are arguments. They get replaced when you use the
          command.
        </p>
      </div>

      <div className={blockClass}>
        <StepBadge kind="type" number="2" label="You type" />
        <TypedLine trigger={example.inputTrigger} args={example.inputArgs} />
      </div>

      <FlowArrow />

      <div className={blockClass}>
        <StepBadge kind="result" number="3" label="Result" />
        <p className={resultBoxClass}>
          <PartsText parts={example.resultParts} />
        </p>
      </div>

      <Legend />
    </div>
  );
}

export function CommandGuide() {
  const [activeId, setActiveId] = useState(examples[0].id);
  const active = examples.find((item) => item.id === activeId) ?? examples[0];

  return (
    <section className={sectionClass}>
      <h2 className={titleClass}>{title}</h2>
      <Rules />
      <ExampleTabs
        items={examples}
        activeId={activeId}
        onChange={setActiveId}
      />
      <ExamplePreview example={active} />
      <MoreLink />
    </section>
  );
}
