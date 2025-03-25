import { useTranslation } from "@/contexts/translateContext";

export const messageHandler = {
  getSuccessMessage(type: string, messageMap: Record<string, string>, fallbackMessage: string = "Action completed"): string {
    const t = useTranslation();
    
    const messageKey = messageMap[type];
    return messageKey ? t(`successMessages.${messageKey}`) : fallbackMessage;
  },

  getErrorMessage(error: any, messageMap: Record<string, string>, fallbackMessage: string = "An error occurred"): string {
    const t = useTranslation();
    
    const errorKey = Object.keys(messageMap).find((key) => error.message.includes(key));
    return errorKey ? t(`errorMessages.${messageMap[errorKey]}`) : error.message || fallbackMessage;
  },
};
