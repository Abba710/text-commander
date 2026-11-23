import type { Entitlement, UserPermissions } from "@/types/user-types";

export function parseEntitlements(
  entitlements: Entitlement[],
): UserPermissions {
  return Object.fromEntries(
    entitlements.map((item) => [item.feature_key, item]),
  );
}
