import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { useLanguageContext } from "@/contexts/Language";
import { useSignUpFormContext } from "../contexts/SignUpForm";

import Field from "@/components/Field";
import FieldValidation from "@/components/FieldValidation";
import Typography from "@/components/Typography";

const Step1 = () => {
  const { t } = useLanguageContext(); 
  const { form, errors, visibility, validations, handleInputChange, handleToggle } = useSignUpFormContext();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Typography fontSize={20} fontWeight="bold" numberOfLines={2}>
          {t("screens.signUp.step1.title")}
        </Typography>
      </View>

      <View style={styles.fieldsContainer}>
        <Field
          value={form.firstName}
          onChangeText={(value) => handleInputChange("firstName", value)}
          error={errors.firstName!}
          placeholder={t("placeholders.firstName")}
          iconLeft={<Icon name="person-outline" size={24} color={colors.grayTint3} />}
          returnKeyType="next"
        />

        <Field
          value={form.lastName}
          onChangeText={(value) => handleInputChange("lastName", value)}
          error={errors.lastName!}
          placeholder={t("placeholders.lastName")}
          iconLeft={<Icon name="person-outline" size={24} color={colors.grayTint3} />}
          returnKeyType="next"
        />

        <Field
          value={form.email}
          onChangeText={(value) => handleInputChange("email", value)}
          error={errors.email!}
          placeholder={t("placeholders.email")}
          iconLeft={<Icon name="mail-outline" size={24} color={colors.grayTint3} />}
          returnKeyType="next"
        />

        <Field
          value={form.password}
          onChangeText={(value) => handleInputChange("password", value)}
          error={errors.password!}
          placeholder={t("placeholders.password")}
          iconLeft={<Icon name="lock-closed-outline" size={24} color={colors.grayTint3} />}
          iconRight={
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => handleToggle("password")}
            >
              <Icon name={visibility.password ? "eye-off-outline" : "eye-outline"} size={24} color={colors.gray} />
            </TouchableOpacity>
          }
          secureTextEntry={!visibility.password}
          textContentType="oneTimeCode"
          returnKeyType="next"
        />

        <Field
          value={form.confirmPassword}
          onChangeText={(value) => handleInputChange("confirmPassword", value)}
          error={errors.confirmPassword!}
          placeholder={t("placeholders.confirmPassword")}
          iconLeft={<Icon name="lock-closed-outline" size={24} color={colors.grayTint3} />}
          iconRight={
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => handleToggle("confirmPassword")}
            >
              <Icon name={visibility.confirmPassword ? "eye-off-outline" : "eye-outline"} size={24} color={colors.gray} />
            </TouchableOpacity>
          }
          secureTextEntry={!visibility.confirmPassword}
          textContentType="oneTimeCode"
          returnKeyType="done"
        />
      </View>

      <View style={styles.validationContainer}>
        <FieldValidation 
          isValid={validations.length} 
          message={t("checkmarks.atLeastCharacters")} 
        />
        <FieldValidation 
          isValid={validations.uppercase} 
          message={t("checkmarks.atLeastOneUppercase")} 
        />
        <FieldValidation 
          isValid={validations.confirmMatch} 
          message={t("checkmarks.passwordMatch")} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.creamTint9,
  },
  titleContainer: {
    marginBottom: 15,
  },
  fieldsContainer: {
    marginBottom: 10,
  },
  toggleButton: {
    backgroundColor: colors.grayTint8,
    borderRadius: 12,
    padding: 4,
  },
  validationContainer: {
    gap: 5,
  },
});

export default Step1;
