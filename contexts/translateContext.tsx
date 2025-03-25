import React, { createContext, useContext } from "react";
import translations from "@/data/translations";
import { languageHandler } from "@/helpers/languageHandler";
import { useLanguageStore } from "@/stores/languageStore";
import { selectLanguage, selectSetLanguage } from "@/selectors/languageSelectors";
import { Language } from "@/types";

type LanguageContextType = Language;
const LanguageContext = createContext<LanguageContextType>("en" as Language);

type SetLanguageContextType = (lang: Language) => void;
const SetLanguageContext = createContext<SetLanguageContextType>({} as SetLanguageContextType);

type TranslationContextType = (key: string) => string;
const TranslationContext = createContext<TranslationContextType>({} as TranslationContextType);

export const TranslateProvider = ({ children }: { children: React.ReactNode }) => {
  const language = useLanguageStore(selectLanguage);
  const setLanguageStore = useLanguageStore(selectSetLanguage);

  const setLanguage = (lang: Language) => setLanguageStore(lang);

  const t = (key: string): string => {
    const keys = key.split(".");
    const value = languageHandler.getTranslation(keys, translations);
    return typeof value === "object" ? value[language] || value["en"] || key : value || key;
  };

  return (
    <TranslationContext.Provider value={t}>
      <LanguageContext.Provider value={language}>
        <SetLanguageContext.Provider value={setLanguage}>
          {children}
        </SetLanguageContext.Provider>
      </LanguageContext.Provider>
    </TranslationContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => useContext(LanguageContext);

export const useSetLanguage = (): SetLanguageContextType => useContext(SetLanguageContext);

export const useTranslation = (): TranslationContextType => useContext(TranslationContext);
