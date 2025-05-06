import { useAuthStore } from "@/stores/authStore";

type AuthStoreType = ReturnType<typeof useAuthStore.getState>;

export const selectUser = (state: AuthStoreType) => state.user;
export const selectIsLoggedIn = (state: AuthStoreType) => state.isLoggedIn;
export const selectIsAdmin = (state: AuthStoreType) => state.isAdmin;
export const selectIsRegisteringProgress = (state: AuthStoreType) => state.isRegisteringProgress;
export const selectAuthDataLoaded = (state: AuthStoreType) => state.authDataLoaded;
export const selectAuthListenerActive = (state: AuthStoreType) => state.authListenerActive;
export const selectLoginStatus = (state: AuthStoreType) => state.authOperations.login.status;
export const selectLoginResponse = (state: AuthStoreType) => state.authOperations.login.response;
export const selectRegisterStatus = (state: AuthStoreType) => state.authOperations.register.status;
export const selectRegisterResponse = (state: AuthStoreType) => state.authOperations.register.response;

export const selectUnsubscribeAuth = (state: AuthStoreType) => state.unsubscribeAuth;

export const selectInitializeAuth = (state: AuthStoreType) => state.initializeAuth;
export const selectLogin = (state: AuthStoreType) => state.login;
export const selectLogout = (state: AuthStoreType) => state.logout;
export const selectRegister = (state: AuthStoreType) => state.register;
export const selectSetUser = (state: AuthStoreType) => state.setUser;
export const selectSetAuthOperationState = (state: AuthStoreType) => state.setAuthOperationState;
export const selectSetIsRegisteringProgress = (state: AuthStoreType) => state.setIsRegisteringProgress;
export const selectCleanupAuth = (state: AuthStoreType) => state.cleanupAuth;
export const selectResetAuthOperationState = (state: AuthStoreType) => state.resetAuthOperationState;
