import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Alert, View, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useEditProfile } from "./hooks/useEditProfile";
import { EditFieldsType } from "@/types";

import ModalWrapper from "@/components/ModalWrapper";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Header from "@/components/Header";
import Typography from "@/components/Typography";

const EditProfileModal = () => {
  const { t } = useLanguageContext();
  const { field } = useLocalSearchParams<{ field: keyof EditFieldsType }>();
  const { newValue, setNewValue, isLoading, isDisabled, response, handleSubmit } = useEditProfile(field);

  useEffect(() => {
    const isError = response?.status === "error";
    const errorMessage = response?.message;

    if (isError && errorMessage) {
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

      <View style={styles.contentContainer}>
        <Field
          label={t(`screens.editProfile.fields.${field}.label`)}
          value={newValue}
          onChangeText={(value) => setNewValue(value)}
          placeholder={t(`screens.editProfile.fields.${field}.placeholder`)}
        />

        <Button 
          onPress={handleSubmit} 
          loading={isLoading}
          disabled={isDisabled}
        >
          <Typography fontSize={16} fontWeight="bold" color={colors.white}>
            {t("screens.editProfile.button")}
          </Typography>
        </Button>
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default EditProfileModal;
