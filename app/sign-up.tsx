import React, { createContext, useContext, useRef, useState, useCallback, useEffect, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet,View, ScrollView, KeyboardAvoidingView, Platform, Text, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants/regex";
import { useLanguage } from "@/contexts/Language";
import { wp, hp } from "@/helpers/common";

import Field from "@/components/Field";
import Button from "@/components/Button";

type Form = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type Errors = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

type PasswordVisibility = {
  password: boolean;
  confirmPassword: boolean;
}

type PasswordValidations = {
  length: boolean;
  uppercase: boolean;
  confirmMatch: boolean;
}

type InputRefs = {
  lastNameInputRef: React.RefObject<TextInput>;
  emailInputRef: React.RefObject<TextInput>;
  passwordInputRef: React.RefObject<TextInput>;
  confirmPasswordInputRef: React.RefObject<TextInput>;
}

interface SignUpFormContextType {
  form: Form;
  errors: Errors;
  passwordVisibility: PasswordVisibility;
  passwordValidations: PasswordValidations;
  currentStep: number;
  inputRefs: InputRefs;
  handleInputChange: (field: string, value: string) => void;
  handleTogglePassword: (field: keyof PasswordVisibility) => void;
  handleNextStep: () => void;
}

const SignUpFormContext = createContext<SignUpFormContextType>({} as SignUpFormContextType);

export const SignUpFormProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useLanguage();
  
  const inputRefs = {
    lastNameInputRef: useRef<TextInput>(null),
    emailInputRef: useRef<TextInput>(null),
    passwordInputRef: useRef<TextInput>(null),
    confirmPasswordInputRef: useRef<TextInput>(null),
  };

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    confirmMatch: false,
  });
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleInputChange = useCallback((field: string, value: string) => {
    setForm((prev) => {
      const updatedForm = { ...prev, [field]: value };

      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: validateField(field, value, updatedForm),
      }));
  
      return updatedForm;
    });
  }, []);

  const handleTogglePassword = useCallback((field: keyof PasswordVisibility) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  const handleNextStep = useCallback(() => setCurrentStep((prev) => prev + 1), []);

  const validateField = (field: string, value: string, formState: typeof form): string | null => {
    if (!value) return t(`validators.${field}Required`);
  
    if (field === "email") {
      return EMAIL_REGEX.test(value) ? null : t(`validators.${field}Invalid`);
    }
  
    if (field === "firstName" || field === "lastName") {
      return value.length < 2 ? t(`validators.${field}MinLength`) : null;
    }
  
    if (field === "password") {
      const isLengthValid = value.length >= 6;
      const hasUppercase = PASSWORD_REGEX.test(value);
  
      return isLengthValid && hasUppercase ? null : t(`validators.${field}Invalid`);
    }
  
    if (field === "confirmPassword") {
      return value === formState.password && formState.password !== "" ? null : t(`validators.${field}Match`);
    }
  
    return null;
  };

  useEffect(() => {
    const validations = {
      length: form.password.length >= 6,
      uppercase: PASSWORD_REGEX.test(form.password),
      confirmMatch: form.password === form.confirmPassword && form.confirmPassword !== "",
    };
  
    setPasswordValidations(validations);
  }, [form.password, form.confirmPassword]);

  const contextValues = useMemo(() => ({
    form,
    errors,
    passwordVisibility,
    passwordValidations,
    currentStep,
  }), [form, errors, passwordVisibility, passwordValidations, currentStep]);

  const contextActions = useMemo(() => ({
    handleInputChange,
    handleTogglePassword,
    handleNextStep,
  }), [handleInputChange, handleTogglePassword, handleNextStep]);

  const contextRefs = useMemo(() => ({
    inputRefs,
  }), [inputRefs]);

  return (
    <SignUpFormContext.Provider value={{ ...contextValues, ...contextActions, ...contextRefs }}>
      {children}
    </SignUpFormContext.Provider>
  );
};

export const useSignUpFormContext = (): SignUpFormContextType => useContext(SignUpFormContext);

const SignUpScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { currentStep } = useSignUpFormContext();

  const steps: Record<number, JSX.Element> = {
    0: <Step1 />,
    1: <Step2 />,
    2: <Step3 />,
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={[
            styles.container, 
            { 
              paddingTop: insets.top, 
              paddingBottom: insets.bottom,
            }
          ]}
        >
          <StatusBar style={Platform.OS === "ios" ? "light" : "dark"} />
          {steps[currentStep] || steps[0]}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const SignUpContainer = () => {
  return (
    <SignUpFormProvider>
      <SignUpScreen />
    </SignUpFormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.CREAM_LIGHT,
  },
});

const Step1 = () => {
  const { t } = useLanguage();
  const { 
    form, 
    errors, 
    passwordVisibility, 
    passwordValidations, 
    handleInputChange, 
    handleTogglePassword, 
    handleNextStep,
    inputRefs,
  } = useSignUpFormContext();

  return (
    <View 
      style={{ 
        flex: 1, 
        backgroundColor: COLORS.CREAM_LIGHT,
      }}
    >
      <View   
        style={{ 
          flexDirection: "column", 
          marginBottom: hp(2), 
          marginHorizontal: wp(4),
        }}
      >
        <Text style={{ fontSize: hp(2.5), fontFamily: "Montserrat-Bold" }}>
          {t("screens.signUp.step1.title")}
        </Text>
        <Text style={{ fontSize: hp(1.5), fontFamily: "Montserrat-Regular" }}>
          {t("screens.signUp.step1.subtitle")}
        </Text>
      </View>
    
      <View style={{ marginHorizontal: wp(4) }}>
        <Field
          label={t("labels.firstName")}
          placeholder={t("placeholders.firstName")}
          value={form.firstName}
          error={errors.firstName}
          iconName="person-outline"
          onChangeText={(value) => handleInputChange("firstName", value)}
          textContentType="givenName"
          returnKeyType="next"
          onSubmitEditing={() => inputRefs.lastNameInputRef.current?.focus()}
          hideLabel
        />
        <Field
          label={t("labels.lastName")}
          placeholder={t("placeholders.lastName")}
          value={form.lastName}
          error={errors.lastName}
          iconName="person-outline"
          onChangeText={(value) => handleInputChange("lastName", value)}
          textContentType="familyName"
          returnKeyType="next"
          inputRef={inputRefs.lastNameInputRef}
          onSubmitEditing={() => inputRefs.emailInputRef.current?.focus()}
          hideLabel
        />
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
          inputRef={inputRefs.emailInputRef}
          onSubmitEditing={() => inputRefs.passwordInputRef.current?.focus()}
          hideLabel
        />
        <Field
          label={t("labels.password")}
          placeholder={t("placeholders.password")}
          value={form.password}
          error={errors.password}
          iconName="lock-closed-outline"
          onChangeText={(value) => handleInputChange("password", value)}
          keyboardType="default"
          textContentType="oneTimeCode"
          returnKeyType="next"
          inputRef={inputRefs.passwordInputRef}
          isPassword
          isPasswordVisible={passwordVisibility.password}
          onTogglePassword={() => handleTogglePassword("password")}
          onSubmitEditing={() => inputRefs.confirmPasswordInputRef.current?.focus()}
          hideLabel
        />
        <Field
          label={t("labels.confirmPassword")}
          placeholder={t("placeholders.confirmPassword")}
          value={form.confirmPassword}
          error={errors.confirmPassword}
          iconName="lock-closed-outline"
          onChangeText={(value) => handleInputChange("confirmPassword", value)}
          keyboardType="default"
          textContentType="oneTimeCode"
          returnKeyType="done"
          inputRef={inputRefs.confirmPasswordInputRef}
          isPassword
          isPasswordVisible={passwordVisibility.confirmPassword}
          onTogglePassword={() => handleTogglePassword("confirmPassword")}
          onSubmitEditing={() => console.log("Signing up...")}
          hideLabel
        />
      </View>
    
      <View style={{ marginBottom: hp(2), marginHorizontal: wp(4) }}>
        <PasswordValidation 
          isValid={passwordValidations.length} 
          message={t("checkmarks.atLeastCharacters")} 
        />
        <PasswordValidation 
          isValid={passwordValidations.uppercase} 
          message={t("checkmarks.atLeastOneUppercase")} 
        />
        <PasswordValidation 
          isValid={passwordValidations.confirmMatch} 
          message={t("checkmarks.passwordMatch")} 
        />
      </View>
    
      <View style={{ marginBottom: hp(1.5), marginHorizontal: wp(4) }}>
        <Button 
          title={t("screens.signUp.step1.button")} 
          onPress={handleNextStep} 
        />
      </View>
    </View>
  );
};

const Step2 = () => {
  const { t } = useLanguage();
  const { handleNextStep } = useSignUpFormContext();

  return (
    <Animated.View 
      entering={SlideInRight.duration(300)} 
      style={{ 
        flex: 1, 
        backgroundColor: COLORS.CREAM_LIGHT,
      }}
    >
      <View 
        style={{ 
          flexDirection: "column", 
          marginBottom: hp(2), 
          marginHorizontal: wp(4),
        }}
      >
        <Text style={{ fontSize: hp(2.5), fontFamily: "Montserrat-Bold" }}>
          {t("screens.signUp.step2.title")}
        </Text>
      </View>
      <View style={{ marginBottom: hp(2), marginHorizontal: wp(4) }}>
        <View 
          style={{ 
            backgroundColor: COLORS.YELLOW_TINT_6, 
            borderRadius: 12, 
            padding: hp(2),
          }}
        >
          <Text style={{ 
            fontSize: hp(1.75), 
            fontFamily: "Montserrat-Bold", 
            color: COLORS.BLACK, 
            marginBottom: hp(0.5),
          }}>
            {t("screens.signUp.step2.notificationTitle")} 🏗️
          </Text>
          <Text style={{ 
            fontSize: hp(1.5), 
            fontFamily: "Montserrat-Regular", 
            color: COLORS.GRAY,
          }}>
            {t("screens.signUp.step2.notificationSubtitle")}
          </Text>
        </View>
      </View>
      <View style={{ marginBottom: hp(1.5), marginHorizontal: wp(4) }}>
        <Button 
          title={t("screens.signUp.step2.button")} 
          onPress={handleNextStep} 
        />
      </View>
    </Animated.View>
  );
};

const Step3 = () => {
  const { t } = useLanguage();

  return (
    <Animated.View 
      entering={SlideInRight.duration(300)} 
      style={{ 
        flex: 1, 
        backgroundColor: COLORS.CREAM_LIGHT,
      }}
    >
      <View style={{ marginBottom: hp(2), marginHorizontal: wp(4) }}>
        <View 
          style={{ 
            flexDirection: "column", 
            alignItems: "center", 
            paddingVertical: hp(5),
          }}
        >
          <Text style={{ 
            fontSize: hp(3), 
            fontFamily: "Montserrat-Bold", 
            color: COLORS.BLACK, 
            marginBottom: hp(0.5),
          }}>
            {t("screens.signUp.step3.successTitle")} 🎉
          </Text>
          <Text style={{ 
            fontSize: hp(2), 
            fontFamily: "Montserrat-Regular", 
            textAlign: "center", 
            color: COLORS.BLACK,
          }}>
            {t("screens.signUp.step3.successSubtitle")}
          </Text>
        </View>
      </View>
      <View style={{ marginBottom: hp(1.5), marginHorizontal: wp(4) }}>
        <Button 
          title={t("screens.signUp.step3.button")} 
          onPress={() => console.log("Finishing...")} 
        />
      </View>
    </Animated.View>
  );
};

interface PasswordValidationProps {
  isValid: boolean;
  message: string;
}

const PasswordValidation: React.FC<PasswordValidationProps> = ({ isValid, message }) => (
  <View style={{ flexDirection: "row", alignItems: "center", minHeight: hp(2.5) }}>
    <Ionicons
      name={isValid ? "checkmark-circle" : "close-circle"}
      size={18}
      color={isValid ? COLORS.GREEN : COLORS.GRAY}
      style={{ marginRight: wp(1) }}
    />
    <Text
      style={{
        fontSize: hp(1.5),
        fontFamily: "Montserrat-Medium",
        color: isValid ? COLORS.GREEN : COLORS.GRAY,
      }}
    >
      {message}
    </Text>
  </View>
);

export default SignUpContainer;
