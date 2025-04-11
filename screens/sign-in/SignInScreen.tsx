import { useState, useEffect } from "react";
import { View, Alert, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from "@/contexts/translateContext";
import { useAuthStore } from "@/stores/authStore";
import { 
  selectAuthStatus, 
  selectAuthResponse,
  selectLogin,
  selectClearAuthResponse, 
} from "@/selectors/authSelectors";
import { colors } from "@/constants/theme";
import { emailRegex } from "@/constants/regex";
import { verticalScale } from "@/helpers/common";
import { LoginField } from "@/types";

import Button from "@/components/Button";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Typography from "@/components/Typography";
import ScreenWrapper from "@/components/ScreenWrapper";

const SignInScreen = () => {
  const t = useTranslation();
  
  const authStatus = useAuthStore(selectAuthStatus);
  const authResponse = useAuthStore(selectAuthResponse);
  
  const login = useAuthStore(selectLogin);
  const clearAuthResponse = useAuthStore(selectClearAuthResponse);

  const [form, setForm] = useState<LoginField>({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [K in keyof LoginField]: string | null }>({
    email: null,
    password: null,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const isAuthenticating = authStatus === "authenticating";
  const isError = authResponse?.status === "error";
  const errorMessage = authResponse?.message;

  const validateField = (field: keyof LoginField, value: string): string | null => {
    if (!value) return t(`validators.${field}Required`);

    if (field === "email") {
      return emailRegex.test(value) ? null : t("validators.emailInvalid");
    }

    if (field === "password") {
      return value.length >= 6 ? null : t("validators.passwordTooShort");
    }

    return null;
  };

  const validateForm = () => {
    return (
      Object.values(form).some((value) => !value) || Object.values(errors).some((error) => !!error)
    );
  };

  const handleInputChange = (field: keyof LoginField, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: validateField(field, value),
    }));
  };

  const handleLogin = async () => {
    if (isAuthenticating || validateForm()) return;

    await login(form.email, form.password);
  };

  const handleGoogleLogin = () => {
    console.log("Signing in with Google...");
  };

  const handleTrouble = () => {
    Alert.alert(t("screens.signIn.troubleAlert"));
  };

  useEffect(() => {
    if (isError) {
      Alert.alert(
        t("alerts.static.error.title"),
        errorMessage || t("alerts.login.error.message")
      );
      clearAuthResponse();
    }
  }, [isError, errorMessage]);
  
  return (
    <ScreenWrapper statusBarStyle="dark">
      <View style={styles.container}>
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.logoContainer}>
          <View style={styles.title}>
            <Typography fontSize={32} fontWeight="bold" color={colors.orange}>
              {t("screens.welcome.titleFirst")}
            </Typography>
            
            <Typography fontSize={32} fontWeight="bold">
              {t("screens.welcome.titleRemaining")}
            </Typography>
          </View>

          <Typography fontSize={14} fontWeight="regular" color={colors.gray} style={styles.subtitle}>
            {t("screens.welcome.subtitle")}
          </Typography>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.fieldsContainer}>
          <Field
            label={t("labels.email")}
            value={form.email}
            onChangeText={(value) => handleInputChange("email", value)}
            error={errors.email!}
            placeholder={t("placeholders.email")}
            iconLeft={
              <Icon
                iconSet="Ionicons" 
                iconName="mail-outline" 
                iconSize={24} 
                iconColor={colors.grayTint3} 
              />
            }
            returnKeyType="next"
          />

          <Field
            label={t("labels.password")}
            value={form.password}
            onChangeText={(value) => handleInputChange("password", value)}
            error={errors.password!}
            placeholder={t("placeholders.password")}
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
                  iconName={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                  iconSize={24} 
                  iconColor={colors.gray} 
                />
              </TouchableOpacity>
            }
            secureTextEntry={!isPasswordVisible}
            returnKeyType="done"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.signInContainer}>
          <Button 
            onPress={handleLogin} 
            loading={isAuthenticating}
          >
            <Typography fontSize={16} fontWeight="bold" color={colors.white}>
              {t("screens.signIn.signIn")}
            </Typography>
          </Button>  
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.signUpContainer}>
          <Typography fontSize={14} fontWeight="regular">
            {t("screens.signIn.register")}{" "}
          </Typography>

          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Typography fontSize={14} fontWeight="bold" color={colors.orange}>
                {t("screens.signIn.registerLink")}
              </Typography>
            </TouchableOpacity>
          </Link>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.orContainer}>
          <View style={styles.line} />

          <Typography fontSize={18} fontWeight="regular" style={styles.text}>
            {t("screens.signIn.or")}
          </Typography>

          <View style={styles.line} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.gooogleSignInContainer}>
          <Button style={styles.button} onPress={handleGoogleLogin}>
            <Image 
              style={styles.icon}
              source={require("@/assets/images/icons/google.png")} 
            />
            <Typography fontSize={16} fontWeight="bold">
              {t("screens.signIn.signInWithGoogle")}
            </Typography>
          </Button>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).springify()} style={styles.troubleContainer}>
          <Typography fontSize={16} fontWeight="regular">
            {t("screens.signIn.trouble")}
          </Typography>

          <TouchableOpacity onPress={handleTrouble}>
            <Typography fontSize={16} fontWeight="bold" color={colors.orange} style={styles.link}>
              {t("screens.signIn.troubleLink")}
            </Typography>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  fieldsContainer: {
    marginBottom: 5,
  },
  toggleButton: {
    backgroundColor: colors.grayTint8,
    borderRadius: 12,
    padding: 4,
  },
  signInContainer: {
    marginBottom: 10,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.grayTint5,
  },
  text: {
    textTransform: "uppercase",
    marginHorizontal: 10,
  },
  gooogleSignInContainer: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.white,
    borderColor: colors.grayTint5,
    borderWidth: 1,
  },
  icon: {
    width: verticalScale(25),
    height: verticalScale(25),
    marginRight: 10,
  },
  troubleContainer: {
    alignItems: "center",
  },
  link: {
    marginTop: 5,
  },
});

export default SignInScreen;
