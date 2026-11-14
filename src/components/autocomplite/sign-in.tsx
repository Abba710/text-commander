import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

const EXTENSION_URL = import.meta.env.DEV
  ? "chrome-extension://apgnphfkjflpcoopljcmngkbenajnpoc/"
  : "";

export function SignIn() {
  return (
    <Card className="max-w-sm gap-6 rounded-2xl border border-border bg-background p-6 shadow-lg">
      <CardHeader className="flex-row items-center gap-3 border-b border-border pb-4 text-left">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background shadow-sm">
          <Terminal className="h-5 w-5" />
        </div>
        <div>
          <CardTitle className="text-lg font-semibold leading-none tracking-tight">
            Welcome
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to continue
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            className="h-11 w-full gap-2"
            onClick={() => {
              window.open(EXTENSION_URL, "_blank", "noopener, noreferrer");
            }}
          >
            Sign in
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            No spam. Access to your account only.
          </p>
        </div>
      </CardHeader>
    </Card>
  );
}
