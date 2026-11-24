"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import {
  AlertCircle,
  ArrowRight,
  ClipboardPaste,
  Globe,
  KeyRound,
  MessagesSquare,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type BoolKey = "true" | "false";

type Slide = {
  title: string;
  text: string;
  trigger: string;
  result: string;
  icon: LucideIcon;
};

type Stats = {
  commands: number;
  insertions: number;
  minutesSaved: number;
};

const t = {
  notice: "Your free period has ended",
  title: "Your free period is over. Your commands are not.",
  description:
    "Let's recall what Text Commander does for you every day, then decide together if it stays in your workflow.",
  statsTitle: "What you built so far",
  statCommands: "commands created",
  statInsertions: "texts inserted",
  statMinutes: "minutes saved",
  typed: "You type",
  inserted: "Appears instantly",
  cta: "Activate Text Commander",
  logout: "Log out",
  reassurance:
    "Your commands are saved. Activate and pick up right where you left off.",
  next: "Next:",
  dotLabel: "Show benefit",
};

const slides: Slide[] = [
  {
    title: "A better copy-paste",
    text: "No more digging through notes and tabs for the text you need. One command and it is already there.",
    trigger: "/address",
    result: "180 Dostyk Ave, office 12, Almaty, 050051",
    icon: ClipboardPaste,
  },
  {
    title: "Work faster",
    text: "Repeating emails, reports and templates take a second to write, not a minute.",
    trigger: "/report",
    result: "Weekly summary: 1. Done. 2. In progress. 3. Blockers.",
    icon: Zap,
  },
  {
    title: "Faster chatting",
    text: "Answer clients and teammates right away. Your common replies are always at hand.",
    trigger: "/thanks",
    result:
      "Thanks for reaching out! I am on it and will reply within an hour.",
    icon: MessagesSquare,
  },
  {
    title: "Works on any website",
    text: "Gmail, Slack, your CRM, any form on any site. The same commands everywhere.",
    trigger: "/email",
    result: "hello@company.com",
    icon: Globe,
  },
];

const slideClass: Record<BoolKey, string> = {
  true: "translate-y-0 opacity-100",
  false: "pointer-events-none translate-y-2 opacity-0",
};

const ariaHidden: Record<BoolKey, "true" | "false"> = {
  true: "false",
  false: "true",
};

const dotClass: Record<BoolKey, string> = {
  true: "w-6 bg-foreground",
  false: "w-2 bg-border hover:bg-muted-foreground/50",
};

const resultClass: Record<BoolKey, string> = {
  true: "translate-y-0 opacity-100",
  false: "translate-y-1 opacity-0",
};

const caretClass: Record<BoolKey, string> = {
  true: "opacity-0",
  false: "tc-caret opacity-100",
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

function StatTile({ value, label }: { value: number; label: string }) {
  const shown = useCountUp(value);
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border/60 bg-background/70 px-4 py-3 backdrop-blur">
      <span className="text-2xl font-semibold tabular-nums tracking-tight">
        {shown.toLocaleString()}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function TypingDemo({ slide, active }: { slide: Slide; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    if (prefersReducedMotion()) {
      setCount(slide.trigger.length);
      return;
    }
    if (count >= slide.trigger.length) {
      return;
    }
    const id = setTimeout(() => setCount((c) => c + 1), 120);
    return () => clearTimeout(id);
  }, [active, count, slide.trigger]);

  const typedText = slide.trigger.slice(0, count);
  const isDone = String(count >= slide.trigger.length) as BoolKey;

  return (
    <div className="grid gap-3 rounded-xl border border-border/60 bg-background/70 p-4 backdrop-blur sm:grid-cols-[minmax(0,14rem)_auto_1fr] sm:items-center sm:gap-5">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          {t.typed}
        </span>
        <div className="flex h-9 items-center rounded-md border border-border bg-muted/40 px-3 font-mono text-sm">
          <span>{typedText}</span>
          <span
            className={`ml-0.5 inline-block h-4 w-px bg-foreground ${caretClass[isDone]}`}
          />
        </div>
      </div>
      <ArrowRight className="hidden h-4 w-4 text-muted-foreground sm:block" />
      <div
        className={`flex flex-col gap-1.5 transition-all duration-500 ${resultClass[isDone]}`}
      >
        <span className="text-xs font-medium text-muted-foreground">
          {t.inserted}
        </span>
        <p className="text-sm leading-relaxed">{slide.result}</p>
      </div>
    </div>
  );
}

type TrialExpiredModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActivate: () => void;
  stats?: Stats;
  logout: () => void;
  slideDuration?: number;
  loading: boolean;
};

export function TrialExpiredModal({
  open,
  onOpenChange,
  onActivate,
  stats,
  logout,
  slideDuration = 6000,
  loading,
}: TrialExpiredModalProps) {
  const [index, setIndex] = useState(0);

  const nextIndex = (index + 1) % slides.length;
  const nextTitle = slides[nextIndex].title;
  const fillStyle: CSSProperties = { animationDuration: `${slideDuration}ms` };

  const goNext = () => setIndex(nextIndex);

  return (
    !loading && (
      <Dialog open={open} onOpenChange={onOpenChange} disablePointerDismissal>
        <DialogContent
          showCloseButton={false}
          className="min-w-[50%] w-[calc(100%-2rem)] gap-0 overflow-hidden rounded-2xl border border-border/60 bg-background p-0 shadow-2xl sm:max-w-3xl"
        >
          <style>{`
          @keyframes tc-fill { from { width: 0%; } to { width: 100%; } }
          @keyframes tc-drift-a { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(40px, 24px) scale(1.15); } }
          @keyframes tc-drift-b { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-36px, -20px) scale(1.1); } }
          @keyframes tc-shimmer { 0% { transform: translateX(-120%); } 60%, 100% { transform: translateX(120%); } }
          @keyframes tc-pulse { 0% { box-shadow: 0 0 0 0 currentColor; opacity: 1; } 70%, 100% { box-shadow: 0 0 0 8px transparent; opacity: 0.6; } }
          @keyframes tc-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
          .tc-fill { animation-name: tc-fill; animation-timing-function: linear; animation-fill-mode: forwards; }
          .tc-drift-a { animation: tc-drift-a 14s ease-in-out infinite; }
          .tc-drift-b { animation: tc-drift-b 18s ease-in-out infinite; }
          .tc-shimmer { animation: tc-shimmer 3.2s ease-in-out infinite; }
          .tc-pulse { animation: tc-pulse 1.8s ease-out infinite; }
          .tc-caret { animation: tc-blink 1s steps(1) infinite; }
          @media (prefers-reduced-motion: reduce) {
            .tc-fill { animation: none; width: 100%; }
            .tc-drift-a, .tc-drift-b, .tc-shimmer, .tc-pulse, .tc-caret { animation: none; }
          }
        `}</style>

          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <div className="tc-drift-a absolute -left-20 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="tc-drift-b absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col">
            {/* Notice */}
            <div className="flex items-center gap-2.5 border-b border-destructive/20 bg-destructive/10 px-6 py-3 text-sm font-medium text-destructive">
              <span className="tc-pulse h-2 w-2 shrink-0 rounded-full bg-destructive text-destructive" />
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{t.notice}</span>
            </div>

            <div className="flex flex-col gap-6 p-6 sm:p-8">
              {/* Header */}
              <div className="flex flex-col gap-2 border-b border-border/60 pb-5">
                <DialogTitle className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {t.title}
                </DialogTitle>
                <DialogDescription className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {t.description}
                </DialogDescription>
              </div>

              {/* Personal stats */}
              {stats && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium">{t.statsTitle}</p>
                  <div className="grid grid-cols-3 gap-3">
                    <StatTile value={stats.commands} label={t.statCommands} />
                    <StatTile
                      value={stats.insertions}
                      label={t.statInsertions}
                    />
                    <StatTile
                      value={stats.minutesSaved}
                      label={t.statMinutes}
                    />
                  </div>
                </div>
              )}

              {/* Slides */}
              <div className="grid" aria-live="polite">
                {slides.map((slide, i) => {
                  const isActive = i === index;
                  const key = String(isActive) as BoolKey;
                  const Icon = slide.icon;
                  return (
                    <article
                      key={slide.title}
                      aria-hidden={ariaHidden[key]}
                      className={`col-start-1 row-start-1 flex flex-col gap-4 transition-all duration-500 ${slideClass[key]}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background shadow-sm">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold leading-none tracking-tight">
                            {slide.title}
                          </h3>
                          <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                            {slide.text}
                          </p>
                        </div>
                      </div>
                      <TypingDemo slide={slide} active={isActive} />
                    </article>
                  );
                })}
              </div>

              {/* Dots and next label */}
              <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  {slides.map((slide, i) => {
                    const key = String(i === index) as BoolKey;
                    return (
                      <button
                        key={slide.title}
                        type="button"
                        aria-label={`${t.dotLabel}: ${slide.title}`}
                        onClick={() => setIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${dotClass[key]}`}
                      />
                    );
                  })}
                </div>
                <p>
                  {t.next} {nextTitle}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 border-t border-border/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={onActivate}
                    variant="default"
                    size="lg"
                    className="relative h-11 overflow-hidden px-6"
                  >
                    <span
                      className="tc-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-background/30 to-transparent"
                      aria-hidden="true"
                    />
                    <KeyRound className="h-4 w-4" />
                    {t.cta}
                  </Button>
                  <Button
                    onClick={logout}
                    variant="ghost"
                    size="lg"
                    className="h-11"
                  >
                    {t.logout}
                  </Button>
                </div>
                <p className="flex max-w-xs items-start gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                  {t.reassurance}
                </p>
              </div>
            </div>

            {/* Progress to next slide */}
            <div className="h-1 w-full bg-border/60">
              <div
                key={index}
                style={fillStyle}
                onAnimationEnd={goNext}
                className="tc-fill h-full bg-foreground"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
}
