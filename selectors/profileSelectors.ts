import { useProfileStore } from "@/stores/profileStore";

type ProfileStoreType = ReturnType<typeof useProfileStore.getState>;

export const selectProfileStatus = (state: ProfileStoreType) => state.profileStatus;
export const selectProfileResponse = (state: ProfileStoreType) => state.profileResponse;

export const selectUpdateProfile = (state: ProfileStoreType) => state.updateProfile;
export const selectResetProfile = (state: ProfileStoreType) => state.resetProfile;
