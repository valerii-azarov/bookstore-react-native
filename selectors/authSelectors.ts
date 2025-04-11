import { useAuthStore } from "@/stores/authStore";

type AuthStoreType = ReturnType<typeof useAuthStore.getState>;

export const selectUser = (state: AuthStoreType) => state.user;
export const selectIsLoggedIn = (state: AuthStoreType) => state.isLoggedIn;
export const selectIsAdmin = (state: AuthStoreType) => state.isAdmin;
export const selectAuthDataLoaded = (state: AuthStoreType) => state.authDataLoaded;
export const selectAuthListenerActive = (state: AuthStoreType) => state.authListenerActive;
export const selectAuthStatus = (state: AuthStoreType) => state.authStatus;
export const selectAuthResponse = (state: AuthStoreType) => state.authResponse;

export const selectUnsubscribeAuth = (state: AuthStoreType) => state.unsubscribeAuth;

export const selectInitializeAuth = (state: AuthStoreType) => state.initializeAuth;
export const selectLogin = (state: AuthStoreType) => state.login;
export const selectLogout = (state: AuthStoreType) => state.logout;
export const selectRegister = (state: AuthStoreType) => state.register;
export const selectSetUser = (state: AuthStoreType) => state.setUser;
export const selectCleanupAuth = (state: AuthStoreType) => state.cleanupAuth;
export const selectClearAuthResponse = (state: AuthStoreType) => state.clearAuthResponse;
