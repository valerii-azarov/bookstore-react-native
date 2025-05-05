import translations from "@/data/translations";
import { useLanguageStore } from "@/stores/languageStore";
import { languageHandler } from "./languageHandler";
import { MessageType } from "@/types";

export const messageHandler = {
  getMessage<T extends MessageType>(
    type: T,
    rawKey: string,
    messageMap: Record<string, string>,
    fallbackMessage = "Message not found"
  ): string {
    const language = useLanguageStore.getState().language || "en";
    const translationRoot = type === "error" ? "errorMessages" : "successMessages";

    const matchedKey = Object.keys(messageMap).find((key) => rawKey.includes(key));
    if (!matchedKey) return fallbackMessage;

    const translationPath = `${translationRoot}.${messageMap[matchedKey]}`.split(".");
    const value = languageHandler.getTranslation(translationPath, translations);

    return typeof value === "object" ? value[language] || value["en"] || fallbackMessage : value || fallbackMessage;
  },

  getSuccessMessage(key: string, messageMap: Record<string, string>, fallbackMessage = "Action completed"): string {
    return messageHandler.getMessage("success", key, messageMap, fallbackMessage);
  },

  getErrorMessage(key: string, messageMap: Record<string, string>, fallbackMessage = "An error occurred"): string {
    return messageHandler.getMessage("error", key, messageMap, fallbackMessage);
  },
};
