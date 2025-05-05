import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { auth } from "@/api/firebase";
import { authApi } from "@/api/authApi";
import { messageHandler } from "@/helpers/messageHandler";
import { asyncStorage } from "@/storages/asyncStorage"; // import { mmkvStorage } from "@/storages/mmkvStorage";
import { BaseUser, Role, SignUpCreation, SignUpFormValues, AuthStatusType, ResponseType } from "@/types";

interface AuthStore {
  user: BaseUser | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isRegisteringProgress: boolean;
  authDataLoaded: boolean;
  authListenerActive: boolean;
  authStatus: AuthStatusType;
  authResponse: ResponseType | null;
  unsubscribeAuth?: Unsubscribe;
  initializeAuth: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (formValues: SignUpFormValues) => Promise<void>;
  setUser: (user: BaseUser | null) => void;
  setIsRegisteringProgress: (value: boolean) => void;
  cleanupAuth: () => void;
  clearAuthResponse: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isLoggedIn: false,
        isAdmin: false,
        isRegisteringProgress: false,
        authDataLoaded: false,
        authListenerActive: false,
        authStatus: "idle",
        authResponse: null,
        unsubscribeAuth: undefined,

        initializeAuth: () => {
          if (get().authListenerActive) {
            return;
          }

          set({ authStatus: "initializing" });

          const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
              if (firebaseUser) {
                set({ authStatus: "fetching" });

                const userData = await authApi.getUser(firebaseUser.uid);
                set({
                  user: userData,
                  isLoggedIn: true,
                  isAdmin: userData?.role === Role.Admin,
                  authDataLoaded: true,
                  authStatus: "idle",
                  authResponse: { status: "success" },
                });
              } else {
                set({
                  user: null,
                  isLoggedIn: false,
                  isAdmin: false,
                  authDataLoaded: true,
                  authStatus: "idle",
                  authResponse: null,
                });
              }
            } catch (error) {
              console.error("Error initializing auth:", error);
              set({
                user: null,
                isLoggedIn: false,
                isAdmin: false,
                authDataLoaded: true,
                authStatus: "idle",
                authResponse: {
                  status: "error",
                  message: "Failed to initialize authentication",
                },
              });
            }
          });

          set({ unsubscribeAuth: unsubscribe, authListenerActive: true });
        },

        login: async (email: string, password: string) => {
          set({ authStatus: "authenticating" });
          
          await authApi.signIn(email, password)
            .then((userData) => {
              set({
                user: userData,
                isLoggedIn: true,
                isAdmin: userData.role === Role.Admin,
                authDataLoaded: true,
                authStatus: "idle",
                authResponse: { status: "success" },
              });
              get().initializeAuth();
            })
            .catch((error) => {
              console.error("Error during login:", error);
              set({
                authStatus: "idle",
                authResponse: {
                  status: "error",
                  message: messageHandler.getErrorMessage(error, {
                    "auth/invalid-credential": "auth.invalidCredentials",
                    "auth/user-disabled": "auth.userDisabled",
                    "auth/network-request-failed": "auth.networkRequestFailed",
                  }),
                },
              });
            });
        },

        logout: async () => {
          set({ authStatus: "loggingOut" });
          
          await authApi.logout()
            .then(() => {
              set({
                authStatus: "idle",
                authResponse: { status: "success" },
              });
              get().cleanupAuth();
            })
            .catch((error) => {
              console.error("Error during logout:", error);
              set({
                authStatus: "idle",
                authResponse: {
                  status: "error",
                  message: "Failed to log out",
                },
              });
            });
        },

        register: async (formValues: SignUpFormValues) => {
          set({ authStatus: "registering" });

          const formData: SignUpCreation = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            password: formValues.password,
          };

          await authApi.signUp(formData)
            .then((userData) =>
              set({
                user: userData,
                isLoggedIn: true,
                isAdmin: userData.role === Role.Admin,
                authStatus: "idle",
                authResponse: { status: "success" },
              })
            )
            .catch((error) => {
              console.error("Error during register:", error);
              set({
                authStatus: "idle",
                authResponse: {
                  status: "error",
                  message: messageHandler.getErrorMessage(error, {
                    "auth/email-already-in-use": "auth.emailAlreadyInUse",
                  }),
                },
              });
            });
        },

        setUser: (user: BaseUser | null) => {
          set({
            user,
            isLoggedIn: !!user,
            isAdmin: user?.role === Role.Admin,
            authStatus: "idle",
            authResponse: null,
          });
        },

        setIsRegisteringProgress: (value: boolean) => {
          set({ isRegisteringProgress: value });
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
              isRegisteringProgress: false,
              authStatus: "idle",
              authResponse: null,
            });
          }
        },

        clearAuthResponse: () => {
          set({ authStatus: "idle", authResponse: null });
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
