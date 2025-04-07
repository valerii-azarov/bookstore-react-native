import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { auth } from "@/api/firebase";
import authApi from "@/api/authApi";
import { asyncStorage } from "@/storages/asyncStorage"; // import { mmkvStorage } from "@/storages/mmkvStorage";
import { UserType, Role } from "@/types";

interface AuthStore {
  user: UserType | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  authDataLoaded: boolean;
  authListenerActive: boolean;
  unsubscribeAuth?: Unsubscribe;
  setUser: (user: UserType | null) => void;
  initializeAuth: () => void;
  cleanupAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isLoggedIn: false,
        isAdmin: false,
        authDataLoaded: false,
        authListenerActive: false,
        unsubscribeAuth: undefined,

        setUser: (user: UserType | null) => {
          set({
            user,
            isLoggedIn: !!user,
            isAdmin: user?.role === Role.Admin,
          });
        },

        initializeAuth: () => {
          if (get().authListenerActive) {
            return;
          }

          const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
              if (firebaseUser) {
                const userData = await authApi.getUser(firebaseUser.uid);
                set({
                  user: userData,
                  isLoggedIn: true,
                  isAdmin: userData?.role === Role.Admin,
                  authDataLoaded: true,
                });
              } else {
                set({
                  user: null,
                  isLoggedIn: false,
                  isAdmin: false,
                  authDataLoaded: true,
                });
              }
            } catch (error) {
              console.error("Error initializing auth:", error);
              set({
                user: null,
                isLoggedIn: false,
                isAdmin: false,
                authDataLoaded: true,
              });
            }
          });

          set({ unsubscribeAuth: unsubscribe, authListenerActive: true });
        },

        cleanupAuth: () => {
          const { unsubscribeAuth } = get();
          if (unsubscribeAuth) {
            unsubscribeAuth();
            set({
              unsubscribeAuth: undefined,
              authDataLoaded: false,
              authListenerActive: false,
              user: null,
              isLoggedIn: false,
              isAdmin: false,
            });
          }
        },
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => asyncStorage),
        partialize: (state) => ({
          user: state.user,
          isLoggedIn: state.isLoggedIn,
          isAdmin: state.isAdmin,
        }),
      }
    ),
    { name: "AuthStore" }
  )
);
