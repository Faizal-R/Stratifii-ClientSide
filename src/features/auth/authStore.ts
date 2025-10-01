import { Roles } from "@/constants/enums/roles";
import { create } from "zustand";

export interface AuthUser {
  id?: string;
  email: string;
  name: string;
  role: Roles;
  status?: string;
}

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
  updateStatus: (status: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
  updateStatus: (status) =>
    set((state) => (state.user ? { user: { ...state.user, status } } : state)),
}));
