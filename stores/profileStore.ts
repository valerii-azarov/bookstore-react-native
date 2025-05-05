import { create } from "zustand";
import { profileApi } from "@/api/profileApi";
import { messageHandler } from "@/helpers/messageHandler";
import { ProfileField, StatusType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";

interface ProfileState {
  profileStatus: StatusType;
  profileResponse: ResponseType | null;
  updateProfile: (field: ProfileField, value: string) => Promise<void>;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profileStatus: "idle",
  profileResponse: null,

  updateProfile: async (field: ProfileField, value: string) => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    set({ profileStatus: "updating", profileResponse: null });

    profileApi
      .updateProfile(userId, field, value)
      .then((user) => {
        set({
          profileResponse: { status: "success" },
          profileStatus: "idle",
        });
        useAuthStore.getState().setUser({
          uid: user?.uid || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user?.email || "",
          role: user?.role || 1,
        });
      })
      .catch((error) =>
        set({
          profileResponse: {
            status: "error",
            message: messageHandler.getErrorMessage(
              error.message, 
              {
                "users/user-not-found-after-update": "users.userNotFoundAfterUpdate",
              }
            ),
          },
          profileStatus: "idle",
        })
      );
  },

  resetProfile: () => {
    set({ profileStatus: "idle", profileResponse: null });
  },

}));
