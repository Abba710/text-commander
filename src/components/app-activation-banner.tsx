import { useEffect, useState } from "react";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const OFFER_ENDS_AT = new Date("2026-12-01T00:00:00Z").getTime();
const ACTIVATE_URL = "#";

const offer = {
  badge: "Limited offer",
  headline: "-50% on activation",
  cta: "Get offer",
  modalTitle: "Activate Text Commander for half the price",
  modalText:
    "This discount is available only during your free trial and expires when the timer reaches zero.",
  oldPrice: "$49.9",
  newPrice: "$24.9",
  action: "Activate now",
};

const benefits = [
  {
    id: "OTP",
    text: "Pay once, own your license forever. No subscriptions or recurring fees.",
  },
  {
    id: "lifetime",
    text: "Lifetime access to every feature currently available in Text Commander.",
  },
  {
    id: "updates",
    text: "Ongoing bug fixes, improvements, and free updates to the core product.",
  },
];

const bannerClass =
  "fixed bottom-4 right-4 z-50 flex w-64 flex-col gap-2 rounded-lg border border-border/60 bg-gradient-to-br from-amber-500/20 to-muted p-3 text-left shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl";

const unitClass =
  "flex min-w-10 flex-col items-center rounded-md bg-background/70 px-1.5 py-1";

const ctaClass =
  buttonVariants({ variant: "default", size: "default" }) + " w-full gap-1.5";

type TimeLeft = {
  total: number;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function getTimeLeft(deadline: number): TimeLeft {
  const total = Math.max(deadline - Date.now(), 0);
  const sec = Math.floor(total / 1000);
  return {
    total,
    days: pad(Math.floor(sec / 86400)),
    hours: pad(Math.floor((sec % 86400) / 3600)),
    minutes: pad(Math.floor((sec % 3600) / 60)),
    seconds: pad(sec % 60),
  };
}

function useCountdown(deadline: number) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(deadline));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(deadline)), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  return timeLeft;
}

function Timer({ timeLeft }: { timeLeft: TimeLeft }) {
  const units = [
    { id: "d", value: timeLeft.days, label: "days" },
    { id: "h", value: timeLeft.hours, label: "hours" },
    { id: "m", value: timeLeft.minutes, label: "min" },
    { id: "s", value: timeLeft.seconds, label: "sec" },
  ];

  return (
    <div className="flex items-center gap-1.5">
      {units.map((unit) => (
        <div key={unit.id} className={unitClass}>
          <span className="font-mono text-sm font-semibold tabular-nums">
            {unit.value}
          </span>
          <span className="text-[9px] uppercase tracking-wide text-muted-foreground">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function Benefits() {
  return (
    <ul className="flex flex-col gap-1.5 text-sm">
      {benefits.map((item) => (
        <li key={item.id} className="flex items-center gap-2">
          <Check className="size-4 shrink-0 text-emerald-500" />
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

export function OfferBanner() {
  const [open, setOpen] = useState(false);
  const timeLeft = useCountdown(OFFER_ENDS_AT);

  if (timeLeft.total === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={bannerClass}
      >
        <div className="flex items-center justify-between">
          <Badge>{offer.badge}</Badge>
          <Clock className="size-3.5 text-muted-foreground" />
        </div>
        <span className="text-sm font-semibold">{offer.headline}</span>
        <Timer timeLeft={timeLeft} />
        <span className="flex items-center gap-1 text-xs font-medium">
          {offer.cta}
          <ArrowRight className="size-3.5" />
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{offer.modalTitle}</DialogTitle>
            <DialogDescription>{offer.modalText}</DialogDescription>
          </DialogHeader>

          <Timer timeLeft={timeLeft} />

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{offer.newPrice}</span>
            <span className="text-sm text-muted-foreground line-through">
              {offer.oldPrice}
            </span>
          </div>

          <Benefits />

          <DialogFooter>
            <a
              href={ACTIVATE_URL}
              target="_blank"
              rel="noreferrer"
              className={ctaClass}
            >
              {offer.action}
              <ArrowRight className="size-4" />
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
