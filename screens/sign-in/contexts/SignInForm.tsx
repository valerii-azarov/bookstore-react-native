import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import authApi from "@/api/authApi";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { emailRegex } from "@/constants/regex";
import { ResponseType, SignInForm, SignInErrors } from "@/types";

interface SignInFormContextType {
  form: SignInForm;
  errors: SignInErrors;
  isPasswordVisible: boolean;
  isIncomplete: boolean;
  isLoading: boolean;
  response: ResponseType | null;
  handleSubmit: () => void;
  handleInputChange: (field: keyof SignInForm, value: string) => void;
  handleToggle: () => void;
}

const SignInFormContext = createContext<SignInFormContextType>({} as SignInFormContextType);

export const SignInFormProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useLanguageContext();

  const [form, setForm] = useState<SignInForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<SignInErrors>({ email: null, password: null });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseType | null>(null);

  const isIncomplete = useMemo(() => {
    return Object.values(form).some((value) => !value) || Object.values(errors).some((error) => !!error);
  }, [form, errors]);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
  
    await authApi.signIn( form.email, form.password)
      .then(() => {
        setResponse({ status: "success" });
      })
      .catch((error) => {
        let message = error.message;
        
        if (error.message.includes("auth/invalid-credential")) {
          message = t("errorMessages.invalidCredentials");
        }

        if (error.message.includes("auth/user-disabled")) {
          message = t("errorMessages.userDisabled");
        }

        if (error.message.includes("auth/network-request-failed")) {
          message = t("errorMessages.networkRequestFailed");
        }
        
        setResponse({ status: "error", message });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [form.email, form.password]);

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

  const handleToggle = useCallback(() => {
    setIsPasswordVisible((prev) => !prev); 
  }, []);

  const validateField = (field: keyof SignInForm, value: string): string | null => {
    if (!value) return t(`validators.${field}Required`);

    if (field === "email") {
      return emailRegex.test(value) ? null : t("validators.emailInvalid");
    }

    return null;
  };

  const contextValues = useMemo(() => ({
    form,
    errors,
    isPasswordVisible,
    isIncomplete,
    isLoading,
    response,
  }), [form, errors, isPasswordVisible, isIncomplete, isLoading, response]);

  const contextActions = useMemo(() => ({
    handleSubmit,
    handleInputChange,
    handleToggle,
  }), [handleSubmit, handleInputChange, handleToggle]);

  return (
    <SignInFormContext.Provider value={{ ...contextValues, ...contextActions }}>
      {children}
    </SignInFormContext.Provider>
  );
};

export const useSignInFormContext = (): SignInFormContextType => useContext(SignInFormContext);
