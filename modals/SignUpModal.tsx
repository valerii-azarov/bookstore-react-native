import { useRef, useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useAuthStore } from "@/stores/authStore";
import {
  selectAuthStatus,
  selectAuthResponse,
  selectRegister,
  // selectClearAuthResponse,
} from "@/selectors/authSelectors";
import { 
  emailRegex, 
  passwordRegex 
} from "@/constants/regex";
import { colors } from "@/constants/theme";
import {
  SignUpField,
  SignUpFormValues, 
  PasswordVisibility, 
  PasswordValidations, 
  DirectionType 
} from "@/types";

import ModalWrapper from "@/components/ModalWrapper";
import KeyboardWrapper from "@/components/KeyboardWrapper";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Input from "@/components/Input";
import FormStepper from "@/components/FormStepper";
import FieldValidation from "@/components/FieldValidation";
import Typography from "@/components/Typography";

const initialValues: SignUpFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpModal = () => {
  const router = useRouter();

  const t = useTranslation();
  const isConnected = useIsConnected();

  const authStatus = useAuthStore(selectAuthStatus);
  const authResponse = useAuthStore(selectAuthResponse);

  console.log(authStatus);
  console.log(authResponse);
  
  const register = useAuthStore(selectRegister);
  // const clearAuthResponse = useAuthStore(selectClearAuthResponse);

  const isRegistering = authStatus === "registering";
  const isSuccess = authResponse?.status === "success";
  const isError = authResponse?.status === "error";

  const message = authResponse?.message;  

  const lastNameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const [formValues, setFormValues] = useState<SignUpFormValues>(initialValues);
  const [errors, setErrors] = useState<{
    [K in SignUpField]: string | null;
  }>({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [visibility, setVisibility] = useState<PasswordVisibility>({
    password: false,
    confirmPassword: false,
  });
  const [validations, setValidations] = useState<PasswordValidations>({
    length: false,
    uppercase: false,
    confirmMatch: false,
  });
  const [direction, setDirection] = useState<DirectionType>("forward");
  const [currentStep, setCurrentStep] = useState<number>(0);

  const validateField = (field: SignUpField, value: string): string | null => {
    if (!value) return t(`validators.${field}Required`);

    if (field === "email") {
      return emailRegex.test(value) ? null : t(`validators.${field}Invalid`);
    }
    
    if (field === "firstName" || field === "lastName") {
      return value.length < 2 ? t(`validators.${field}MinLength`) : null;
    }
    
    if (field === "password") {
      const isLengthValid = value.length >= 6;
      const hasUppercase = passwordRegex.test(value);
      
      return isLengthValid && hasUppercase ? null : t(`validators.${field}Invalid`);
    }
      
    if (field === "confirmPassword") {
      return value === formValues.password && formValues.password !== "" ? null : t(`validators.${field}Match`);
    }

    return null;
  };

  const handleInputChange = (field: SignUpField, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: validateField(field, value),
    }));
  };

  const steps = [
    {
      title: t("modals.signUp.titles.step1"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>      
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.signUp.labels.firstName")}
            </Typography>
      
            <Input
              value={formValues.firstName}
              onChangeText={(value) => handleInputChange("firstName", value)}
              placeholder={t("modals.signUp.placeholders.firstName")}
              containerStyle={{
                borderColor: errors.firstName ? colors.redTint1 : colors.gray,
              }}
              keyboardType="default"
              returnKeyType="next"
              onSubmitEditing={() => lastNameInputRef.current?.focus()}
            />

            {errors.firstName && (
              <Typography
                fontSize={12}
                fontWeight="medium"
                color={colors.redTint1}
                numberOfLines={1}
                style={{ marginLeft: 10 }}
              >
                {errors.firstName}
              </Typography>
            )}
          </View> 

          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.signUp.labels.lastName")}
            </Typography>
      
            <Input
              ref={lastNameInputRef}
              value={formValues.lastName}
              onChangeText={(value) => handleInputChange("lastName", value)}
              placeholder={t("modals.signUp.placeholders.lastName")}
              containerStyle={{
                borderColor: errors.lastName ? colors.redTint1 : colors.gray,
              }}
              keyboardType="default"
              // returnKeyType="done"
              // onSubmitEditing={() => handleNext()}
            />
            
            {errors.lastName && (
              <Typography
                fontSize={12}
                fontWeight="medium"
                color={colors.redTint1}
                numberOfLines={1}
                style={{ marginLeft: 10 }}
              >
                {errors.lastName}
              </Typography>
            )}
          </View>
        </View>
      ),
      validate: (form: SignUpFormValues) => {
        const errors = {
          firstName: validateField("firstName", form.firstName),
          lastName: validateField("lastName", form.lastName),
        };
        return !errors.firstName && !errors.lastName;
      },
    },
    {
      title: t("modals.signUp.titles.step2"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.signUp.labels.email")}
            </Typography>
      
            <Input
              value={formValues.email}
              onChangeText={(value) => handleInputChange("email", value)}
              placeholder={t("modals.signUp.placeholders.email")}
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
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            {errors.email && (
              <Typography
                fontSize={12}
                fontWeight="medium"
                color={colors.redTint1}
                numberOfLines={1}
                style={{ marginLeft: 10 }}
              >
                {errors.email}
              </Typography>
            )}
          </View>

          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.signUp.labels.password")}
            </Typography>
      
            <Input
              ref={passwordInputRef}
              value={formValues.password}
              onChangeText={(value) => handleInputChange("password", value)}
              placeholder={t("modals.signUp.placeholders.password")}
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
                  style={{
                    backgroundColor: colors.grayTint8,
                    borderRadius: 12,
                    padding: 4,
                  }}
                  onPress={() => setVisibility((prev) => ({ ...prev, password: !prev.password }))}
                >
                  <Icon
                    iconSet="Ionicons"
                    iconName={
                      visibility.password ? "eye-off-outline" : "eye-outline"
                    }
                    iconSize={24}
                    iconColor={colors.gray}
                  />
                </TouchableOpacity>
              }
              containerStyle={{
                borderColor: errors.password ? colors.redTint1 : colors.gray,
              }}
              secureTextEntry={!visibility.password}
              textContentType="oneTimeCode"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />

            {errors.password && (
              <Typography
                fontSize={12}
                fontWeight="medium"
                color={colors.redTint1}
                numberOfLines={1}
                style={{ marginLeft: 10 }}
              >
                {errors.password}
              </Typography>
            )}
          </View>

          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.signUp.labels.confirmPassword")}
            </Typography>
      
            <Input
              ref={confirmPasswordInputRef}
              value={formValues.confirmPassword}
              onChangeText={(value) => handleInputChange("confirmPassword", value)}
              placeholder={t("modals.signUp.placeholders.confirmPassword")}
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
                  style={{
                    backgroundColor: colors.grayTint8,
                    borderRadius: 12,
                    padding: 4,
                  }}
                  onPress={() => setVisibility((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                >
                  <Icon
                    iconSet="Ionicons"
                    iconName={
                      visibility.confirmPassword ? "eye-off-outline" : "eye-outline"
                    }
                    iconSize={24}
                    iconColor={colors.gray}
                  />
                </TouchableOpacity>
              }
              containerStyle={{
                borderColor: errors.confirmPassword ? colors.redTint1 : colors.gray,
              }}
              secureTextEntry={!visibility.confirmPassword}
              textContentType="oneTimeCode"
              // returnKeyType="done"
              // onSubmitEditing={() => handleNext()}
            />

            {errors.confirmPassword && (
              <Typography
                fontSize={12}
                fontWeight="medium"
                color={colors.redTint1}
                numberOfLines={1}
                style={{ marginLeft: 10 }}
              >
                {errors.confirmPassword}
              </Typography>
            )}
          </View>

          <View style={{ flexDirection: "column", gap: 10 }}>
            <FieldValidation 
              isValid={validations.length} 
              message={t("modals.signUp.checkmarks.atLeastCharacters")} 
            />

            <FieldValidation 
              isValid={validations.uppercase} 
              message={t("modals.signUp.checkmarks.atLeastOneUppercase")} 
            />

            <FieldValidation 
              isValid={validations.confirmMatch} 
              message={t("modals.signUp.checkmarks.passwordMatch")} 
            />
          </View>
        </View>
      ),
      validate: (form: SignUpFormValues) => {
        const errors = {
          email: validateField("email", form.email),
          password: validateField("password", form.password),
          confirmPassword: validateField("confirmPassword", form.confirmPassword),
        };
        return !errors.email && !errors.password && !errors.confirmPassword;
      },
      scrollEnabled: true,
    },    
    {
      title: "",
      hideTitle: true,
      component: ( 
        <View 
          style={{
            padding: 20,
            justifyContent: "center", 
            alignItems: "center",
          }}
        >
          <Typography fontSize={24} fontWeight="bold" style={{ marginBottom: 10, textAlign: "center" }}>
            {t(`modals.checkout.messages.${isSuccess ? "success" : "error"}.title`)}
          </Typography>
          
          <Typography fontSize={16} fontWeight="medium" color={colors.blackTint5} style={{ textAlign: "center" }}>
            {t(`modals.checkout.messages.${isSuccess ? "success" : "error"}.text`) || message}
          </Typography>
        </View>
      ),
    },
  ];

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const isSecondToLastStep = currentStep === steps.length - 2;

  const handleNext = () => {
    setDirection("forward");
    if (isLastStep) {
      return isError ? router.back() : router.replace("/books");
    }
    if (isSecondToLastStep && !isRegistering && isConnected) {
      register(formValues);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setDirection("backward");
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    const validations = {
      length: formValues.password.length >= 6,
      uppercase: passwordRegex.test(formValues.password),
      confirmMatch: formValues.password === formValues.confirmPassword && formValues.confirmPassword !== "",
    };
    
    setValidations(validations);
  }, [formValues.password, formValues.confirmPassword]);

  useEffect(() => {
    if (isSecondToLastStep && !isRegistering && authResponse) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [isRegistering, isSecondToLastStep, authResponse]);

  // useEffect(() => {
  //   return () => clearAuthResponse();
  // }, []);

  return (
    <ModalWrapper>
      <KeyboardWrapper>
        <Header
          title={t("modals.signUp.header.text")}
          iconLeft={<BackButton />}
          style={{
            paddingHorizontal: 15,
            marginBottom: 10,
          }}
        />

        <FormStepper<SignUpFormValues>
          steps={steps}
          currentStep={currentStep}
          direction={direction}
          stepStatus={{ 
            isFirst: isFirstStep, 
            isLast: isLastStep,
            isSecondToLast: isSecondToLastStep 
          }}
          onNext={handleNext}
          onPrevious={handlePrevious}
          form={formValues}
          buttonLabels={{
            next: t(`modals.signUp.buttons.${isError ? "back" : isLastStep ? "finish" : isSecondToLastStep ? "register" : "continue"}.text`),
            previous: t("modals.signUp.buttons.back.text"),
          }}
          buttonProps={{ 
            next: { 
              disabled: isRegistering || !isConnected, 
              loading: isRegistering 
            },
            previous: { disabled: isFirstStep },
          }}
        />
      </KeyboardWrapper>
    </ModalWrapper>
  );
};

export default SignUpModal;
