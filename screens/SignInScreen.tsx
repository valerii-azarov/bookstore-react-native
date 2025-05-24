import { useRef, useState, useEffect } from "react";
import { View, Alert, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useAuthStore } from "@/stores/authStore";
import {
  selectLoginStatus,
  selectLoginResponse,
  selectLogin,
  selectResetAuthOperationState,
} from "@/selectors/authSelectors";
import { colors } from "@/constants/theme";
import { emailRegex } from "@/constants/regex";
import { SignInField, SignInFormValues } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import KeyboardWrapper from "@/components/KeyboardWrapper";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Input from "@/components/Input";
import Typography from "@/components/Typography";

const initialValues: SignInFormValues = {
  email: "",
  password: "",
};

const SignInScreen = () => {
  const t = useTranslation();
  const isConnected = useIsConnected();

  const loginStatus = useAuthStore(selectLoginStatus);
  const loginResponse = useAuthStore(selectLoginResponse);

  const login = useAuthStore(selectLogin);
  const resetAuthOperationState = useAuthStore(selectResetAuthOperationState);

  const passwordInputRef = useRef<TextInput>(null);

  const [formValues, setFormValues] = useState<SignInFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof SignInFormValues, string | null>>>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const isAuthenticating = loginStatus === "authenticating";
  const isError = loginResponse?.status === "error";
  const message = loginResponse?.message;

  const validateField = (field: SignInField, value: string): string | null => {
    if (!value) return t(`screens.signIn.validators.${field}.required`);

    if (field === "email") {
      return emailRegex.test(value) ? null : t("screens.signIn.validators.email.invalid");
    }
  
    if (field === "password") {
      return value.length >= 6 ? null : t("screens.signIn.validators.password.tooShort");
    }
  
    return null;
  };

  const validateForm = () => {
    return (
      Object.values(formValues).some((value) => !value) ||
      Object.values(errors).some((error) => !!error)
    );
  };

  const handleInputChange = <K extends keyof SignInFormValues>(field: K, value: SignInFormValues[K]) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: validateField(field, value),
    }));
  };

  const handleLogin = async () => {
    if (!isConnected || isAuthenticating || validateForm()) return;

    await login(formValues);
  };

  useEffect(() => {
    if (isError && message) {
      Alert.alert(
        t("screens.signIn.alerts.failedLogin.title"),
        message || t("screens.signIn.alerts.failedLogin.message"),
        [
          {
            text: "OK",
            onPress: () => resetAuthOperationState("login"),
          },
        ]
      );
    }
  }, [isError, message]);

  return (
    <ScreenWrapper 
      hideStatusBarBackground
      hideStatusBarBorder
      enableFooter
    >
      <KeyboardWrapper>
        <View style={[styles.content, styles.padded]}>
          <View style={styles.logoContainer}>
            <View style={styles.title}>
              <Typography fontSize={32} fontWeight="bold" color={colors.orange}>
                {t("screens.signIn.header.title.first")}
              </Typography>

              <Typography fontSize={32} fontWeight="bold" color={colors.black}>
                {t("screens.signIn.header.title.remaining")}
              </Typography>
            </View>

            <Typography
              fontSize={14}
              fontWeight="regular"
              color={colors.gray}
              style={styles.subtitle}
            >
              {t("screens.signIn.header.subtitle")}
            </Typography>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.field}>
              <Typography fontSize={14} fontWeight="medium" color={colors.black} style={styles.label}>
                {t("screens.signIn.fields.email.label")}
              </Typography>

              <Input
                value={formValues.email}
                onChangeText={(value) => handleInputChange("email", value)}
                placeholder={t("screens.signIn.fields.email.placeholder")}
                iconLeft={
                  <Icon
                    iconSet="Ionicons"
                    iconName="mail-outline"
                    iconSize={24}
                    iconColor={colors.grayTint3}
                  />
                }
                containerStyle={{
                  borderColor: errors.email ? colors.redTint1 : colors.gray,
                }}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              {errors.email && (
                <Typography
                  fontSize={12}
                  fontWeight="medium"
                  color={colors.redTint1}
                  numberOfLines={1}
                  style={styles.errorText}
                >
                  {errors.email}
                </Typography>
              )}
            </View>

            <View style={styles.field}>
              <Typography fontSize={14} fontWeight="medium" color={colors.black} style={styles.label}>
                {t("screens.signIn.fields.password.label")}
              </Typography>

              <Input
                ref={passwordInputRef}
                value={formValues.password}
                onChangeText={(value) => handleInputChange("password", value)}
                placeholder={t("screens.signIn.fields.password.placeholder")}
                iconLeft={
                  <Icon
                    iconSet="Ionicons"
                    iconName="lock-closed-outline"
                    iconSize={24}
                    iconColor={colors.grayTint3}
                  />
                }
                iconRight={
                  <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <Icon
                      iconSet="Ionicons"
                      iconName={
                        isPasswordVisible ? "eye-off-outline" : "eye-outline"
                      }
                      iconSize={24}
                      iconColor={colors.gray}
                    />
                  </TouchableOpacity>
                }
                containerStyle={{
                  borderColor: errors.password ? colors.redTint1 : colors.gray,
                }}
                secureTextEntry={!isPasswordVisible}
                returnKeyType="done"
              />

              {errors.password && (
                <Typography
                  fontSize={12}
                  fontWeight="medium"
                  color={colors.redTint1}
                  numberOfLines={1}
                  style={styles.errorText}
                >
                  {errors.password}
                </Typography>
              )}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button 
              onPress={handleLogin} 
              loading={isAuthenticating}
              disabled={!isConnected || validateForm()}
            >
              <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                {t("screens.signIn.buttons.signIn")}
              </Typography>
            </Button>

            <View style={styles.registerRow}>
              <Typography fontSize={14} fontWeight="regular" color={colors.black}>
                {t("screens.signIn.labels.register")}{" "}
              </Typography>

              <Link href="/sign-up" asChild>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  disabled={!isConnected}
                >
                  <Typography
                    fontSize={14}
                    fontWeight="bold"
                    color={isConnected ? colors.orange : colors.grayTint7}
                  >
                    {t("screens.signIn.links.register")}
                  </Typography>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          <View
            style={[
              styles.divider,
              {
                marginTop: 5,
              },
            ]}
          />

          <View style={styles.helpContainer}>
            <Typography fontSize={16} fontWeight="regular">
              {t("screens.signIn.labels.trouble")}
            </Typography>

            <TouchableOpacity>
              <Typography
                fontSize={16}
                fontWeight="bold"
                color={colors.orange}
                style={{ textTransform: "uppercase" }}
              >
                {t("screens.signIn.links.trouble")}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardWrapper>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    gap: 25,
  },
  logoContainer: {
    flexDirection: "column",
  },
  title: {
    flexDirection: "row",
    justifyContent: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  formContainer: {
    flexDirection: "column", 
    gap: 15,
  },
  field: {
    minHeight: 75,
  },
  label: {
    marginBottom: 5,
  },
  errorText: {
    marginLeft: 10,
  },
  toggleButton: {
    backgroundColor: colors.grayTint8,
    borderRadius: 12,
    padding: 4,
  },
  buttonContainer: {
   flexDirection: "column",
   gap: 5,
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  helpContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  divider: {
    height: 1.5,
    backgroundColor: colors.grayTint5,
    opacity: 0.3,
  },
  padded: {
    padding: 15,
  },
});

export default SignInScreen;
