import type { User } from "@/types/user-types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
}

export const useAuthStore = create<AuthState>(() => ({
  user: null,
  loading: true,
  initialized: false,
}));
