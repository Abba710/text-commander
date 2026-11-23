export interface User {
  id: string;
  mail: string | undefined;
  metaData: {
    avatar_url?: string;
    picture?: string;
    full_name?: string;
    name?: string;
  };
}

export interface Entitlement {
  feature_key: string;
  feature_type: "activated" | "trial" | "expired";
  expires_at: string | null;
}

export type UserPermissions = Record<string, Entitlement>;
