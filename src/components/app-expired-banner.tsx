import { TrialExpiredModal } from "@/components/modal/trial-expired-modal";
import { useState } from "react";
import { useEntitlements } from "@/hooks/use-entitlement";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

export function TrialExpiredBanner() {
  const [open, setOpen] = useState(false);
  const { entitlements, loading } = useEntitlements();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!entitlements.core && user) {
      setOpen(true);
      return;
    }
    setOpen(false);
  }, [entitlements, user]);
  return (
    <>
      <TrialExpiredModal
        open={open}
        onOpenChange={setOpen}
        onActivate={() => {
          console.log("activated");
        }}
        logout={logout}
        stats={{ commands: 14, insertions: 1248, minutesSaved: 310 }}
        loading={loading}
      ></TrialExpiredModal>
    </>
  );
}
