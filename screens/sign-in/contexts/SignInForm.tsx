import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { useLanguageContext } from "@/contexts/Language";
import { emailRegex } from "@/constants/regex";
import { SignInForm, SignInErrors } from "@/types";

interface SignInFormContextType {
  form: SignInForm;
  errors: SignInErrors;
  isPasswordVisible: boolean;
  isIncomplete: boolean;
  handleInputChange: (field: keyof SignInForm, value: string) => void;
  handleToggle: () => void;
}

const SignInFormContext = createContext<SignInFormContextType>({} as SignInFormContextType);

export const SignInFormProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useLanguageContext();

  const [form, setForm] = useState<SignInForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<SignInErrors>({ email: null, password: null });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleInputChange = useCallback((field: keyof SignInForm, value: string) => {
    setForm((prev) => {
      const updatedForm = { ...prev, [field]: value };
      
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: validateField(field, value),
      }));

      return updatedForm;
    });
  }, []);

  const handleToggle = useCallback(() => setIsPasswordVisible((prev) => !prev), []);

  const validateField = (field: keyof SignInForm, value: string): string | null => {
    if (!value) return t(`validators.${field}Required`);

    if (field === "email") {
      return emailRegex.test(value) ? null : t("validators.emailInvalid");
    }

    return null;
  };

  const isIncomplete = useMemo(() => {
    return Object.values(form).some((value) => !value) || Object.values(errors).some((error) => !!error);
  }, [form, errors]);

  const contextValues = useMemo(() => ({
    form,
    errors,
    isPasswordVisible,
    isIncomplete,
  }), [form, errors, isPasswordVisible, isIncomplete]);

  const contextActions = useMemo(() => ({
    handleInputChange,
    handleToggle,
  }), [handleInputChange, handleToggle]);

  return (
    <SignInFormContext.Provider value={{ ...contextValues, ...contextActions }}>
      {children}
    </SignInFormContext.Provider>
  );
};

export const useSignInFormContext = (): SignInFormContextType => useContext(SignInFormContext);
