import React, { useRef, useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";
import { selectUser } from "@/selectors/authSelectors";
import { 
  selectProfileStatus, 
  selectProfileResponse, 
  selectUpdateProfile,
  selectResetProfile,
} from "@/selectors/profileSelectors";
import { ProfileField } from "@/types";
import { colors } from "@/constants/theme";

import ModalWrapper from "@/components/ModalWrapper";
import KeyboardWrapper from "@/components/KeyboardWrapper";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Field from "@/components/Field";
import Typography from "@/components/Typography";

const EditProfileModal = () => {
  const router = useRouter();
  const { field } = useLocalSearchParams<{ field: ProfileField }>();

  const t = useTranslation();
  const isConnected = useIsConnected();

  const user = useAuthStore(selectUser);
  
  const profileStatus = useProfileStore(selectProfileStatus);
  const profileResponse = useProfileStore(selectProfileResponse);
  
  const updateProfile = useProfileStore(selectUpdateProfile);
  const reset = useProfileStore(selectResetProfile);

  const status = profileResponse?.status;
  const message = profileResponse?.message;

  const typedField = field as ProfileField | undefined;

  const initialValueRef = useRef<string | null>(null);

  const [newValue, setNewValue] = useState<string>("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateField = (field: ProfileField, value: string): string | null => {
    if (!value || value.trim() === "") {
      return t(`modals.editProfile.validators.${field}.required`);
    }

    if (value.trim().length < 2) {
      return t(`modals.editProfile.validators.${field}.minLength`);
    }

    return null;
  };

  const handleInputChange = (value: string) => {
    if (!typedField) return;
      
    setNewValue(value);
  
    const error = validateField(typedField, value);
    setValidationError(error);
  };

  const handleUpdate = () => {
    if (field && newValue !== initialValueRef.current && isConnected) {
      updateProfile(field, newValue);
    }
  };

  useEffect(() => {
    if (!typedField) return;

    const value = user?.[typedField] ?? "";

    initialValueRef.current = value;
    setNewValue(value);
  }, [typedField, user]);

  useEffect(() => {
    if (status === "error" && message) {
      Alert.alert(
        t("modals.editProfile.alerts.profileUpdate.responses.error.title"),
        message || t("modals.editProfile.alerts.profileUpdate.responses.error.message")
      );
    }

    if (status === "success") {
      Alert.alert(
        t("modals.editProfile.alerts.profileUpdate.responses.success.title"),
        t("modals.editProfile.alerts.profileUpdate.responses.success.message"),
        [{ text: "OK", onPress: () => setTimeout(() => router.back(), 500) }]
      );
    }

    return () => reset();
  }, [status]);
  
  const isUpdating = profileStatus === "updating";
  const isSaveDisabled = isUpdating || newValue === initialValueRef.current || !isConnected || !!validationError;

  return (
    <ModalWrapper>
      <KeyboardWrapper>
        <Header
          title={t(`modals.editProfile.header.title.${field}`)}
          titleSize={18}
          iconLeft={<BackButton />}
          style={{
            paddingHorizontal: 15,
            marginBottom: 10,
          }}
        />

        <View style={{ flex: 1, padding: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography 
              fontSize={14} 
              fontWeight="medium" 
              color={colors.black} 
              style={{ marginBottom: 5 }}
            >
              {t(`modals.editProfile.fields.${field}.label`)}
            </Typography>
      
            <Field 
              type="input"
              value={newValue}
              onChangeText={(text) => handleInputChange(text)}
              placeholder={t(`modals.editProfile.fields.${field}.placeholder`)}
              error={validationError}
              keyboardType="default"
              editable={!isUpdating}
            />
          </View>
        </View> 

        <View 
          style={{
            backgroundColor: colors.grayTint9,
            padding: 10,
            paddingHorizontal: 15,
          }}
        >
          <Button onPress={handleUpdate} loading={isUpdating} disabled={isSaveDisabled}>
            <Typography fontSize={16} fontWeight="bold" color={colors.white}>
              {t("modals.editProfile.buttons.save")}
            </Typography>
          </Button>
        </View> 
      </KeyboardWrapper>
    </ModalWrapper>
  );
};

export default EditProfileModal;
