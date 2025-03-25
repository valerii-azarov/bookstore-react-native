import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import profileApi from "@/api/profileApi";
import { useAuthStore } from "@/stores/authStore";
import { selectUser, selectSetUser } from "@/selectors/authSelectors";
import { EditFieldType, ResponseType } from "@/types";

type UseEditProfileReturn = {
  newValue: string | undefined;
  setNewValue: (value: string) => void;
  isLoading: boolean;
  isDisabled: boolean;
  response: ResponseType | null;
  handleSubmit: () => Promise<void>;
};

export const useEditProfile = (field: keyof EditFieldType): UseEditProfileReturn => {
  const router = useRouter();

  const user = useAuthStore(selectUser);
  const setUser = useAuthStore(selectSetUser);

  const initialValue = user?.[field];
  const [newValue, setNewValue] = useState<string | undefined>(initialValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseType | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!user?.uid || newValue === initialValue) return; 

    setIsLoading(true);

    await profileApi.updateProfile(user.uid, { [field]: newValue }, setUser)
      .then(() => {
        setResponse({ status: "success" });
      })
      .catch((error) => {
        setResponse({ status: "error", message: error.message });
      })
      .finally(() => {
        setIsLoading(false);
        router.back();
      });
  }, [field, user, setUser, newValue, initialValue]);

  return {
    newValue,
    setNewValue,
    isLoading,
    isDisabled: newValue === initialValue,
    response,
    handleSubmit,
  };
};
