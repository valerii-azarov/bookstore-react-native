import { useEffect } from "react";
import { Alert, View, ScrollView, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { colors } from "@/constants/theme";
import { useTranslation } from "@/contexts/translateContext";
import { useEditProfile } from "./hooks/useEditProfile";
import { EditFieldType } from "@/types";

import ModalWrapper from "@/components/ModalWrapper";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Header from "@/components/Header";
import Typography from "@/components/Typography";

const EditProfileModal = () => {
  const t = useTranslation();
  
  const { field } = useLocalSearchParams<{ field: keyof EditFieldType }>();
  const { newValue, setNewValue, isLoading, isDisabled, response, handleSubmit } = useEditProfile(field);

  useEffect(() => {
    if (response?.status === "error" && response?.message) {
      Alert.alert(t("alerts.error.title"), response.message);
    }
  }, [response]);

  return (
    <ModalWrapper style={{ backgroundColor: colors.creamTint9 }}>
      <Header
        title={t(`screens.editProfile.header.${field}`)}
        iconLeft={<BackButton style={{ backgroundColor: colors.orangeTint5 }} />}
        style={styles.headerContainer}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView 
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollViewContainer}
          >
            <Field
              label={t(`screens.editProfile.fields.${field}.label`)}
              value={newValue}
              onChangeText={setNewValue}
              placeholder={t(`screens.editProfile.fields.${field}.placeholder`)}
            />
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button onPress={handleSubmit} loading={isLoading} disabled={isDisabled}>
              <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                {t("screens.editProfile.button")}
              </Typography>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    backgroundColor: colors.creamTint9,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
});

export default EditProfileModal;
