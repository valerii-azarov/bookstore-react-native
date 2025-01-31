import React, { useRef, useState, useCallback } from "react";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, Alert, View, Text, TextInput, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { COLORS } from "@/constants/colors";
import { useLanguage } from "@/contexts/Language";
import { wp, hp } from "@/helpers/common";

import Field from "@/components/Field";
import Button from "@/components/Button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignInScreen = () => {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();

  const passwordInputRef = useRef<TextInput>(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  
  const handleInputChange = useCallback((field: string, value: string) => {
    setForm((prev) => {
      const updatedForm = { ...prev, [field]: value };

      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: validateField(field, value),
      }));
  
      return updatedForm;
    });
  }, []);

  const handleSignIn = () => {
    console.log("Signing in...");
  };

  const handleTrouble = () => {
    Alert.alert(t("screens.signIn.troubleAlert"));
  };

  const validateField = (field: string, value: string): string | null => {
    if (!value) return t(`validators.${field}Required`);

    if (field === "email") {
      return EMAIL_REGEX.test(value) ? null : t("validators.emailInvalid");
    }

    return null;
  };

  return (
    <View
      style={[
        styles.container,
        { 
          paddingTop: insets.top, 
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <StatusBar style="dark" />
      
      <Animated.View entering={FadeInDown.delay(200).springify()}>
        <View style={styles.header}>
          <Text style={styles.title}>
            <Text style={{ color: COLORS.ORANGE }}>
              {t("screens.signIn.titleFirst")}
            </Text>
            <Text>
              {t("screens.signIn.titleRemaining")}
            </Text>
          </Text>
          <Text style={styles.subtitle}>
            {t("screens.signIn.title")}
          </Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400).springify()}>
        <View style={styles.formContainer}>
          <Field
            label={t("labels.email")}
            placeholder={t("placeholders.email")}
            value={form.email}
            error={errors.email}
            iconName="mail-outline"
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
          />

          <Field
            label={t("labels.password")}
            placeholder={t("placeholders.password")}
            value={form.password}
            error={errors.password}
            iconName="lock-closed-outline"
            onChangeText={(value) => handleInputChange("password", value)}
            keyboardType="default"
            textContentType="password"
            returnKeyType="done"
            inputRef={passwordInputRef}
            isPassword
            isPasswordVisible={isPasswordVisible}
            onTogglePassword={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(600).springify()}>
        <View style={styles.signInContainer}>
          <Button
            title={t("screens.signIn.signIn")}
            onPress={handleSignIn}
            disabled={!form.email || !form.password || !!errors.email || !!errors.password}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(800).springify()}>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            {t("screens.signIn.register")}{" "}
          </Text>
          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.registerLink}>
                {t("screens.signIn.registerLink")}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(1000).springify()}>
        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>{t("screens.signIn.or")}</Text>
          <View style={styles.orLine} />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(1200).springify()}>
        <View style={styles.googleContainer}>
          <Button
            title={t("screens.signIn.signInWithGoogle")}
            onPress={() => console.log("Sign in with Google")}
            style={{
              backgroundColor: COLORS.WHITE,
              borderColor: COLORS.GRAY_TINT_5,
              borderWidth: 1,
            }}
            textStyle={{
              color: COLORS.BLACK,
            }}
            iconSource={require("@/assets/images/icons/google.png")}
          />
        </View>
      </Animated.View>
      
      <Animated.View entering={FadeInDown.delay(1400).springify()}>
        <View style={styles.troubleContainer}>
          <Text style={styles.troubleText}>
            {t("screens.signIn.trouble")}
          </Text>
          <TouchableOpacity onPress={handleTrouble}>
            <Text style={styles.troubleLink}>
              {t("screens.signIn.troubleLink")}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.CREAM_LIGHT,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: hp(2),
  },
  title: {
    fontSize: hp(4),
    fontFamily: "Montserrat-Bold",
  },
  subtitle: {
    fontSize: hp(1.5),
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
  },
  formContainer: {
    marginBottom: hp(2),
    marginHorizontal: wp(4),
  },
  signInContainer: {
    marginBottom: hp(1.5),
    marginHorizontal: wp(4),
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: wp(4),
  },
  registerText: {
    fontSize: hp(1.5),
    fontFamily: "Montserrat-Regular",
    color: COLORS.BLACK,
  },
  registerLink: {
    fontSize: hp(1.5),
    fontFamily: "Montserrat-Bold",
    color: COLORS.ORANGE,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(2.5),
    marginHorizontal: wp(4),
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.GRAY_TINT_5,
  },
  orText: {
    fontSize: hp(2),
    fontFamily: "Montserrat-Regular",
    textTransform: "uppercase",
    marginHorizontal: 15,
  },
  googleContainer: {
    marginBottom: hp(5),
    marginHorizontal: wp(4),
  },
  troubleContainer: {
    marginHorizontal: wp(4),
    alignItems: "center",
  },
  troubleText: {
    fontSize: hp(1.75),
    fontFamily: "Montserrat-Regular",
    color: COLORS.BLACK,
    textAlign: "center",
  },
  troubleLink: {
    fontSize: hp(1.75),
    fontFamily: "Montserrat-Bold",
    color: COLORS.ORANGE,
    marginTop: 5,
  },
});

export default SignInScreen;
