/** @format */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const LS_KEY = "auth_email";

interface AuthState {
  email: string | null;
  isLoggedIn: boolean;
  init: () => void;
  setEmail: (email: string | null, options?: { persist?: boolean }) => void;
  login: (email: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      isLoggedIn: false,

      init: () => {
        // This will be automatically handled by persist middleware
      },

      setEmail: (email) => {
        set({ email, isLoggedIn: !!email });
      },

      login: (email: string) => {
        set({ email, isLoggedIn: true });
      },

      logout: () => {
        set({ email: null, isLoggedIn: false });
      },
    }),
    {
      name: LS_KEY,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoggedIn = !!state.email;
        }
      },
    }
  )
);

export default useAuthStore;
