import { useAuthStore } from "@/stores/authStore";

type AuthStoreType = ReturnType<typeof useAuthStore.getState>;

export const selectUser = (state: AuthStoreType) => state.user;
export const selectIsLoggedIn = (state: AuthStoreType) => state.isLoggedIn;
export const selectIsAdmin = (state: AuthStoreType) => state.isAdmin;
export const selectAuthDataLoaded = (state: AuthStoreType) => state.authDataLoaded;
export const selectAuthListenerActive = (state: AuthStoreType) => state.authListenerActive;

export const selectUnsubscribeAuth = (state: AuthStoreType) => state.unsubscribeAuth;

export const selectSetUser = (state: AuthStoreType) => state.setUser;
export const selectInitializeAuth = (state: AuthStoreType) => state.initializeAuth;
export const selectCleanupAuth = (state: AuthStoreType) => state.cleanupAuth;
