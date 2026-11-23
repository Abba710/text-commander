import { parseEntitlements } from "@/domain/entitlements/parseEntitlements";
import { fetchEntitlements } from "@/service/entitlementService";
import { useEntitlementStore } from "@/store/entitlementStore";
import { useCallback, useState } from "react";

export function useEntitlements() {
  const entitlements = useEntitlementStore((state) => state.entitlements);
  const setEntitlements = useEntitlementStore((state) => state.setEntitlements);
  const [loading, setLoading] = useState<boolean>(false);

  const getEntitlements = useCallback(async () => {
    setLoading(true);
    const result = await fetchEntitlements();
    if ((result.success = true)) {
      const parsedEntitlements = parseEntitlements(result.data);
      setEntitlements(parsedEntitlements);
      console.log("get entit", parsedEntitlements);
      setLoading(false);
    }
    console.log(result.error);
  }, [fetchEntitlements, setEntitlements, setLoading]);

  const removeEntitlements = useCallback(async () => {
    setEntitlements({});
  }, [setEntitlements]);

  return {
    entitlements,
    loading,
    getEntitlements,
    removeEntitlements,
  };
}
