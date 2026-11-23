import { useAuth } from "@/hooks/use-auth";
import { useEntitlements } from "@/hooks/use-entitlement";
import { MessageSquareCode } from "lucide-react";

const TRIAL_DAYS = 30;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const pluralRules = new Intl.PluralRules("en");

const dayWords: Record<string, string> = {
  one: "day",
  other: "days",
};

const statusConfig = {
  loading: {
    label: "LOADING",
    badge: "bg-slate-500/15 text-slate-600 dark:text-slate-400",
    dot: "bg-slate-500 animate-pulse",
    bar: "bg-slate-500",
    showProgress: false,
  },
  trial: {
    label: "TRIAL",
    badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
    showProgress: true,
  },
  activated: {
    label: "ACTIVE",
    badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
    showProgress: false,
  },
  expired: {
    label: "EXPIRED",
    badge: "bg-red-500/15 text-red-600 dark:text-red-400",
    dot: "bg-red-500",
    bar: "bg-red-500",
    showProgress: false,
  },
} as const;

type StatusKey = keyof typeof statusConfig;

function getStatusKey(user: unknown, featureType?: string): StatusKey {
  if (!featureType && user) {
    return "expired";
  }
  if (featureType && featureType in statusConfig) {
    return featureType as StatusKey;
  }
  return "loading";
}

function getDaysLeft(expiresAt?: string | null): number {
  if (!expiresAt) return 0;
  const diff = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / MS_PER_DAY));
}

function formatDaysLeft(days: number): string {
  return `${days} ${dayWords[pluralRules.select(days)]} left`;
}

type TrialProgressProps = {
  percent: number;
  text: string;
  barClass: string;
};

function TrialProgress({ percent, text, barClass }: TrialProgressProps) {
  return (
    <div className="mt-1 flex flex-col gap-1">
      <div className="h-1 w-full overflow-hidden rounded-full bg-sidebar-foreground/10">
        <div
          className={`h-full rounded-full transition-all ${barClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="truncate text-[11px] text-sidebar-foreground/60">
        {text}
      </span>
    </div>
  );
}

export function SidebarHeaderInfo() {
  const { entitlements } = useEntitlements();
  const { user } = useAuth();
  const core = entitlements?.core;

  const t = statusConfig[getStatusKey(user, core?.feature_type)];
  const daysLeft = getDaysLeft(core?.expires_at);
  const percent = Math.min(100, (daysLeft / TRIAL_DAYS) * 100);

  const hasProgress = t.showProgress && Boolean(core?.expires_at);

  const trialInfo = hasProgress && (
    <TrialProgress
      percent={percent}
      text={formatDaysLeft(daysLeft)}
      barClass={t.bar}
    />
  );

  return (
    <div className="mt-5 flex gap-2 p-2">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-foreground">
        <MessageSquareCode className="size-4 text-sidebar-primary-foreground" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center text-left text-sm leading-tight">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-semibold">Text-Commander</span>
          <span className="rounded bg-sidebar-foreground/10 px-1 text-[10px] font-medium">
            BETA
          </span>
        </div>
        <div className="mt-0.5 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${t.badge}`}
          >
            <span className={`size-1.5 rounded-full ${t.dot}`} />
            {t.label}
          </span>
        </div>
        {trialInfo}
      </div>
    </div>
  );
}
