import { useState, useEffect } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
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
import Input from "@/components/Input";
import Typography from "@/components/Typography";

const EditProfileModal = () => {
  const t = useTranslation();
  const { field } = useLocalSearchParams<{ field: ProfileField }>();

  const router = useRouter();

  const user = useAuthStore(selectUser);
  
  const profileStatus = useProfileStore(selectProfileStatus);
  const profileResponse = useProfileStore(selectProfileResponse);
  
  const updateProfile = useProfileStore(selectUpdateProfile);
  const resetProfile = useProfileStore(selectResetProfile);

  const initialValue = user?.[field] || "";
  const [newValue, setNewValue] = useState<string>(initialValue);

  const isUpdating = profileStatus === "updating";
  const isError = profileResponse?.status === "error";
  const isSuccess = profileResponse?.status === "success";
  const message = profileResponse?.message;

  const handleUpdate = () => {
    if (field && newValue !== initialValue) {
      updateProfile(field, newValue);
    }
  };

  useEffect(() => {
    if (isError && message) {
      Alert.alert(
        t("alerts.static.error.title"),
        message || t("alerts.profileUpdate.error.message")
      );
    }
    return () => resetProfile();
  }, [isError]);
  
  useEffect(() => {
    if (isSuccess) {
      Alert.alert(
        t("alerts.static.success.title"),
        t("alerts.profileUpdate.success.message"),
        [{ text: "OK", onPress: () => setTimeout(() => router.back(), 500) }]
      );
    }
    return () => resetProfile();
  }, [isSuccess, router]);
  
  return (
    <ModalWrapper>
      <KeyboardWrapper>
        <Header
          title={t(`modals.editProfile.header.${field}`)}
          titleSize={18}
          iconLeft={<BackButton />}
          style={{
            paddingHorizontal: 15,
            marginBottom: 10,
          }}
        />

        <View style={[styles.content, styles.padded]}>
          <View style={styles.field}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t(`modals.editProfile.labels.${field}.text`)}
            </Typography>
      
            <Input 
              value={newValue}
              onChangeText={setNewValue}
              placeholder={t(`modals.editProfile.placeholders.${field}.text`)}
              keyboardType="default"
              editable={!isUpdating}
            />
          </View>
        </View> 

        <View style={styles.buttonContainer}>
          <Button 
            onPress={handleUpdate}
            loading={isUpdating} 
            disabled={isUpdating || newValue === initialValue}
          >
            <Typography fontSize={16} fontWeight="bold" color={colors.white}>
              {t("modals.editProfile.buttons.save.text")}
            </Typography>
          </Button>
        </View> 
      </KeyboardWrapper>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  field: {
    flex: 1, 
    minHeight: 75,
  },
  buttonContainer: {
    backgroundColor: colors.grayTint9,
    padding: 10,
    paddingHorizontal: 15,
  },
  padded: {
    padding: 15,
  },
});

export default EditProfileModal;
