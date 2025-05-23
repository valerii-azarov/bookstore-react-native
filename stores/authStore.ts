import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { auth } from "@/api/firebase";
import { authApi } from "@/api/authApi";
import { messageHandler } from "@/helpers/messageHandler";
import { asyncStorage } from "@/storages/asyncStorage"; // import { mmkvStorage } from "@/storages/mmkvStorage";
import {
  BaseUser,
  Role,
  SignUpCreation,
  SignUpFormValues,
  SignInCredentials,
  AuthStatusType,
  ResponseType,
} from "@/types";

type AuthOperation = "login" | "register" | "logout" | "init";

type OperationState = {
  status: AuthStatusType;
  response: ResponseType | null;
};

interface AuthStore {
  user: BaseUser | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isRegisteringProgress: boolean;
  authDataLoaded: boolean;
  authListenerActive: boolean;
  authOperations: Record<AuthOperation, OperationState>;
  unsubscribeAuth?: Unsubscribe;
  initializeAuth: () => void;
  login: (formValues: SignInCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (formValues: SignUpFormValues) => Promise<void>;
  setUser: (user: BaseUser | null) => void;
  setAuthOperationState: (op: AuthOperation, state: Partial<OperationState>) => void;
  setIsRegisteringProgress: (value: boolean) => void;
  cleanupAuth: () => void;
  resetAuthOperationState: (op: AuthOperation) => void;
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
        authOperations: {
          login: {
            status: "idle",
            response: null,
          },
          register: {
            status: "idle",
            response: null,
          },
          logout: {
            status: "idle",
            response: null,
          },
          init: {
            status: "idle",
            response: null,
          },
        },
        unsubscribeAuth: undefined,

        initializeAuth: () => {
          if (get().authListenerActive) {
            return;
          }

          get().unsubscribeAuth?.();

          set((state) => ({
            authOperations: {
              ...state.authOperations,
              init: { status: "initializing", response: null },
            },
          }));

          const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
              if (firebaseUser) {
                set((state) => ({
                  authOperations: {
                    ...state.authOperations,
                    init: { status: "fetching", response: null },
                  },
                }));

                const userData = await authApi.getUser(firebaseUser.uid);
                set((state) => ({
                  user: userData,
                  isLoggedIn: true,
                  isAdmin: userData?.role === Role.Admin,
                  authDataLoaded: true,
                  authOperations: {
                    ...state.authOperations,
                    init: {
                      status: "idle",
                      response: { status: "success" },
                    },
                  },
                }));
              } else {
                set((state) => ({
                  user: null,
                  isLoggedIn: false,
                  isAdmin: false,
                  authDataLoaded: true,
                  authOperations: {
                    ...state.authOperations,
                    init: { status: "idle", response: null },
                  },
                }));
              }
            } catch (error) {
              console.error("Error initializing auth:", error);
              set((state) => ({
                user: null,
                isLoggedIn: false,
                isAdmin: false,
                authDataLoaded: true,
                authListenerActive: false,
                unsubscribeAuth: undefined,
                authOperations: {
                  ...state.authOperations,
                  init: {
                    status: "idle",
                    response: {
                      status: "error",
                      message: "Failed to initialize authentication",
                    },
                  },
                },
              }));
            }
          });

          set({ unsubscribeAuth: unsubscribe, authListenerActive: true });
        },

        login: async (formValues: SignInCredentials) => {
          set((state) => ({
            authOperations: {
              ...state.authOperations,
              login: { status: "authenticating", response: null },
            },
          }));

          await authApi
            .signIn(formValues)
            .then((userData) => {
              set((state) => ({
                user: userData,
                isLoggedIn: true,
                isAdmin: userData.role === Role.Admin,
                authDataLoaded: true,
                authOperations: {
                  ...state.authOperations,
                  login: {
                    status: "idle",
                    response: { status: "success" },
                  },
                },
              }));
              get().initializeAuth();
            })
            .catch((error) => {
              set((state) => ({
                authOperations: {
                  ...state.authOperations,
                  login: {
                    status: "idle",
                    response: {
                      status: "error",
                      message: messageHandler.getErrorMessage(
                        error.message, 
                        {
                          "auth/invalid-credential": "auth.invalidCredentials",
                          "auth/user-disabled": "auth.userDisabled",
                          "auth/network-request-failed": "auth.networkRequestFailed",
                        }
                      ),
                    },
                  },
                },
              }));
            });
        },

        logout: async () => {
          set((state) => ({
            authOperations: {
              ...state.authOperations,
              logout: { status: "loggingOut", response: null },
            },
          }));

          await authApi
            .logout()
            .then(() => {
              set((state) => ({
                authOperations: {
                  ...state.authOperations,
                  logout: { status: "idle", response: { status: "success" } },
                },
              }));
              get().cleanupAuth();
            })
            .catch((error) => {
              console.error("Error during logout:", error);
              set((state) => ({
                authOperations: {
                  ...state.authOperations,
                  logout: {
                    status: "idle",
                    response: {
                      status: "error",
                      message: "Failed to log out",
                    },
                  },
                },
              }));
            });
        },

        register: async (formValues: SignUpFormValues) => {
          set((state) => ({
            authOperations: {
              ...state.authOperations,
              register: { status: "registering", response: null },
            },
          }));

          const formData: SignUpCreation = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            password: formValues.password,
          };

          await authApi
            .signUp(formData)
            .then((userData) =>
              set((state) => ({
                user: userData,
                isLoggedIn: true,
                isAdmin: userData.role === Role.Admin,
                authOperations: {
                  ...state.authOperations,
                  register: {
                    status: "idle",
                    response: { status: "success" },
                  },
                },
              }))
            )
            .catch((error) => {
              set((state) => ({
                authOperations: {
                  ...state.authOperations,
                  register: {
                    status: "idle",
                    response: {
                      status: "error",
                      message: messageHandler.getErrorMessage(
                        error.message, 
                        {
                          "auth/email-already-in-use": "auth.emailAlreadyInUse",
                        }
                      ),
                    },
                  },
                },
              }));
            });
        },

        setUser: (user: BaseUser | null) => {
          set({
            user,
            isLoggedIn: !!user,
            isAdmin: user?.role === Role.Admin,
          });
        },

        setAuthOperationState: (op, stateUpdate) => {
          set((state) => ({
            authOperations: {
              ...state.authOperations,
              [op]: { ...state.authOperations[op], ...stateUpdate },
            },
          }));
        },

        setIsRegisteringProgress: (value: boolean) => {
          set({ isRegisteringProgress: value });
        },

        cleanupAuth: () => {
          get().unsubscribeAuth?.();
          set({
            unsubscribeAuth: undefined,
            authDataLoaded: false,
            authListenerActive: false,
            user: null,
            isLoggedIn: false,
            isAdmin: false,
            isRegisteringProgress: false,
            authOperations: {
              login: {
                status: "idle",
                response: null,
              },
              register: {
                status: "idle",
                response: null,
              },
              logout: {
                status: "idle",
                response: null,
              },
              init: {
                status: "idle",
                response: null,
              },
            },
          });
        },

        resetAuthOperationState: (op) => {
          set((state) => ({
            authOperations: {
              ...state.authOperations,
              [op]: { status: "idle", response: null },
            },
          }));
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
