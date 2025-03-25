import { useEffect } from "react";
import { Link } from "expo-router";
import { Alert, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";
import { useTranslation } from "@/contexts/translateContext";
import { SignInFormProvider } from "./contexts/SignInForm";
import { useSignInFormContext } from "./contexts/SignInForm";

import Button from "@/components/Button";
import Field from "@/components/Field";
import Typography from "@/components/Typography";
import ScreenWrapper from "@/components/ScreenWrapper";

const SignInScreen = () => {
  const t = useTranslation();
  const { form, errors, isPasswordVisible, isIncomplete, isLoading, response, handleSubmit, handleInputChange, handleToggle } = useSignInFormContext();

  const handleGoogleSignIn = () => {
    console.log("Signing in with Google...");
  };

  const handleTrouble = () => {
    Alert.alert(t("screens.signIn.troubleAlert"));
  };

  useEffect(() => {
    const isError = response?.status === "error";
    const errorMessage = response?.message;

    if (isError && errorMessage) {
      Alert.alert(t("alerts.error.title"), response.message);
    }
  }, [response]);

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
            iconLeft={<Icon name="mail-outline" size={24} color={colors.grayTint3} />}
            returnKeyType="next"
          />

          <Field
            label={t("labels.password")}
            value={form.password}
            onChangeText={(value) => handleInputChange("password", value)}
            error={errors.password!}
            placeholder={t("placeholders.password")}
            iconLeft={<Icon name="lock-closed-outline" size={24} color={colors.grayTint3} />}
            iconRight={
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={handleToggle}
              >
                <Icon name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color={colors.gray} />
              </TouchableOpacity>
            }
            secureTextEntry={!isPasswordVisible}
            returnKeyType="done"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.signInContainer}>
          <Button 
            onPress={handleSubmit} 
            loading={isLoading}
            disabled={isIncomplete}
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
          <Button style={styles.button} onPress={handleGoogleSignIn}>
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

const SignInContainer = () => {
  return (
    <SignInFormProvider>
      <SignInScreen />
    </SignInFormProvider>
  );
};

export default SignInContainer;
