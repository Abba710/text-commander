import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Terminal, Loader2 } from "lucide-react";

export function AuthModal() {
  const { user, signInWithGoogle, loading } = useAuth();

  const loadingKey = String(Boolean(loading)) as "true" | "false";
  const states = {
    true: {
      label: "Signing in",
      button:
        "h-11 w-full gap-2 bg-muted text-muted-foreground disabled:opacity-100",
      spinner: "h-4 w-4 animate-spin",
    },
    false: {
      label: "Continue with Google",
      button: "h-11 w-full gap-2",
      spinner: "hidden",
    },
  };
  const t = states[loadingKey];

  return (
    <Dialog open={!user} disablePointerDismissal>
      <DialogContent
        showCloseButton={false}
        className="max-w-sm gap-6 rounded-2xl border border-border bg-background p-6 shadow-lg"
      >
        <DialogHeader className="flex-row items-center gap-3 border-b border-border pb-4 text-left">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background shadow-sm">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <DialogTitle className="text-lg font-semibold leading-none tracking-tight">
              Welcome
            </DialogTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to continue
            </p>
          </div>
        </DialogHeader>

        <DialogDescription className="text-sm text-muted-foreground">
          Your commands are saved to your account and available on any device.
          It takes a few seconds.
        </DialogDescription>

        <div className="flex flex-col gap-3">
          <Button
            className={t.button}
            onClick={signInWithGoogle}
            disabled={loading}
            aria-busy={loading}
          >
            <Loader2 className={t.spinner} />
            {t.label}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            No spam. Access to your account only.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
