import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import { useLanguageContext } from "@/contexts/Language";
import { emailRegex, passwordRegex } from "@/constants/regex";
import { SignUpForm, SignUpErrors, SignUpVisibility, SignUpValidations } from "@/types";

interface SignUpFormContextType {
  form: SignUpForm;
  errors: SignUpErrors;
  visibility: SignUpVisibility;
  validations: SignUpValidations;
  isIncomplete: boolean;
  currentStep: number;
  handleInputChange: (field: keyof SignUpForm, value: string) => void;
  handleToggle: (field: keyof SignUpVisibility) => void;
  handleNext: () => void;
}

const SignUpFormContext = createContext<SignUpFormContextType>({} as SignUpFormContextType);

export const SignUpFormProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useLanguageContext();

  const [form, setForm] = useState<SignUpForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<SignUpErrors>({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [visibility, setVisibility] = useState<SignUpVisibility>({
    password: false,
    confirmPassword: false,
  });
  const [validations, setValidations] = useState<SignUpValidations>({
    length: false,
    uppercase: false,
    confirmMatch: false,
  });
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleInputChange = useCallback((field: keyof SignUpForm, value: string) => {
    setForm((prev) => {
      const updatedForm = { ...prev, [field]: value };

      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: validateField(field, value, updatedForm),
      }));
  
      return updatedForm;
    });
  }, []);

  const handleToggle = useCallback((field: keyof SignUpVisibility) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  const handleNext = useCallback(() => setCurrentStep((prev) => prev + 1), []);

  const validateField = (field: string, value: string, formState: typeof form): string | null => {
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
      return value === formState.password && formState.password !== "" ? null : t(`validators.${field}Match`);
    }
  
    return null;
  };

  const isIncomplete = useMemo(() => {
    return Object.values(form).some((value) => !value) || Object.values(errors).some((error) => !!error);
  }, [form, errors]);

  useEffect(() => {
    const validations = {
      length: form.password.length >= 6,
      uppercase: passwordRegex.test(form.password),
      confirmMatch: form.password === form.confirmPassword && form.confirmPassword !== "",
    };
  
    setValidations(validations);
  }, [form.password, form.confirmPassword]);

  const contextValues = useMemo(() => ({
    form,
    errors,
    visibility,
    validations,
    isIncomplete,
    currentStep,
  }), [form, errors, visibility, validations, isIncomplete, currentStep]);

  const contextActions = useMemo(() => ({
    handleInputChange,
    handleToggle,
    handleNext,
  }), [handleInputChange, handleToggle, handleNext]);

  return (
    <SignUpFormContext.Provider value={{ ...contextValues, ...contextActions }}>
      {children}
    </SignUpFormContext.Provider>
  );
};

export const useSignUpFormContext = (): SignUpFormContextType => useContext(SignUpFormContext);
