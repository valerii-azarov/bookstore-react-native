import { useLanguageContext } from "@/contexts/LanguageContext";

export const errorHandler = {
  getErrorMessage(error: any, errorMap: Record<string, string>): string {
    const { t } = useLanguageContext();
    
    const errorKey = Object.keys(errorMap).find((key) => error.message.includes(key));
    return errorKey ? t(`errorMessages.${errorMap[errorKey]}`) : error.message;
  },
};
