import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/util/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { User } from "@/types/user-types";
import { AUTH_KEY } from "@/consts/supabase-consts";
import { useEntitlements } from "./use-entitlement";

interface ChromeManifest {
  oauth2?: {
    client_id: string;
    scopes: string[];
  };
}

export function useAuth() {
  // TODO: Сделать вход между сессиями незаметным
  const { getEntitlements, removeEntitlements } = useEntitlements();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialize, setInitialize] = useState(true);

  const mapUser = (u: SupabaseUser): User => ({
    id: u.id,
    mail: u.email,
    metaData: u.user_metadata,
  });

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ? mapUser(session.user) : null);
      getEntitlements();
      setLoading(false);
      setInitialize(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? mapUser(session.user) : null);
      getEntitlements();
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onChange = (
      changes: Record<string, chrome.storage.StorageChange>,
      area: string,
    ) => {
      if (area !== "local" || !changes[AUTH_KEY]) return;
      const raw = changes[AUTH_KEY].newValue;
      const session = raw ? JSON.parse(raw as string) : null;
      setUser(session?.user ?? null);
      getEntitlements();
      setLoading(false);
    };
    chrome.storage.onChanged.addListener(onChange);
    return () => chrome.storage.onChanged.removeListener(onChange);
  }, []);

  const signInWithGoogle = useCallback(() => {
    setLoading(true);
    const manifest = chrome.runtime.getManifest() as ChromeManifest;

    if (!manifest.oauth2) {
      console.error("oauth2 is missing in manifest");
      return;
    }

    const clientId = manifest.oauth2.client_id;
    const scopes = manifest.oauth2.scopes.join(" ");
    const redirectUri = chrome.identity.getRedirectURL();

    const authUrl = new URL("https://accounts.google.com/o/oauth2/auth");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("response_type", "id_token");
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", scopes);
    authUrl.searchParams.set("prompt", "select_account");

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl.toString(),
        interactive: true,
      },
      async (redirectedTo) => {
        if (chrome.runtime.lastError || !redirectedTo) {
          console.error("Auth failed", chrome.runtime.lastError);
          setLoading(false);
          return;
        }

        const redirectedUrl = new URL(redirectedTo);
        const params = new URLSearchParams(redirectedUrl.hash.replace("#", ""));

        const idToken = params.get("id_token");

        if (!idToken) {
          console.error("id_token not found");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: idToken,
        });

        console.log("Supabase signInWithIdToken response", { data });

        if (error) {
          console.error("Supabase auth error", error);
          setLoading(false);
          return;
        }

        if (data.session?.user) {
          setUser(mapUser(data.session.user));
          getEntitlements();
          setLoading(false);
          console.log(data);
        }
      },
    );
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    removeEntitlements();
    setLoading(false);
  }, []);

  return {
    user,
    loading,
    signInWithGoogle,
    logout,
    initialize,
  };
}
