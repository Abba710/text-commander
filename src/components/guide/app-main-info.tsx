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
  listClass,
  previewClass,
  resultBoxClass,
  sectionClass,
  stepClass,
  subtitleClass,
  titleClass,
} from "@/components/guide/guide-shared";
import type { BaseExample } from "@/components/guide/guide-shared";

const examples: BaseExample[] = [
  {
    id: "one",
    title: "One argument",
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

const title = "Smart Commands";
const subtitle = "Write messages faster on any website.";

const rootClass = sectionClass + " mx-auto w-full max-w-xs";

const steps: { id: string; content: React.ReactNode }[] = [
  {
    id: "open",
    content: (
      <>
        Type <Code>#</Code> in any text field to open the command list.
      </>
    ),
  },
  {
    id: "pick",
    content: (
      <>Pick a command from the list, or type its trigger with values.</>
    ),
  },
  {
    id: "insert",
    content: <>The text is inserted with your values.</>,
  },
];

function Steps() {
  return (
    <ol className={listClass}>
      {steps.map((step, index) => (
        <li key={step.id} className="flex items-start gap-2.5">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
            {index + 1}
          </span>
          <span className="text-muted-foreground">{step.content}</span>
        </li>
      ))}
    </ol>
  );
}

function ExampleLabel({
  kind,
  label,
}: {
  kind: "type" | "result";
  label: string;
}) {
  return (
    <span
      className={
        "w-fit rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide " +
        stepClass[kind]
      }
    >
      {label}
    </span>
  );
}

function ExamplePreview({ example }: { example: BaseExample }) {
  return (
    <div className={previewClass}>
      <div className={blockClass}>
        <ExampleLabel kind="type" label="You type" />
        <TypedLine trigger={example.inputTrigger} args={example.inputArgs} />
      </div>

      <FlowArrow />

      <div className={blockClass}>
        <ExampleLabel kind="result" label="Result" />
        <p className={resultBoxClass}>
          <PartsText parts={example.resultParts} />
        </p>
      </div>

      <Legend />
    </div>
  );
}

export function MainInfo() {
  const [activeId, setActiveId] = useState(examples[0].id);
  const active = examples.find((item) => item.id === activeId) ?? examples[0];

  return (
    <section data-debug="main info component" className={rootClass}>
      <header className="flex flex-col gap-1">
        <h2 className={titleClass}>{title}</h2>
        <p className={subtitleClass}>{subtitle}</p>
      </header>
      <Steps />
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
