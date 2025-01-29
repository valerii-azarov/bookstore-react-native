import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translations, { Translations } from "@/data/translations";

type Language = "en" | "uk";

type LanguageContextType = {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const changeLanguage = async (lang: Language) => {
    setLanguage(lang);
    await AsyncStorage.setItem("language", lang);
  };

  const getTranslation = (keys: string[], obj: Translations): string | undefined => {
    return keys.reduce<Translations | string | undefined>((acc, key) => {
      if (acc && typeof acc === "object" && key in acc) {
        return (acc as Translations)[key];
      }
      return undefined;
    }, obj) as string | undefined;
  };  
  
  const t = (key: string): string => {
    const keys = key.split(".");
    const value = getTranslation(keys, translations);
  
    return typeof value === "object" ? value[language] || value["en"] || key : value || key;
  };
  
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) setLanguage(savedLanguage as Language);
    };
    loadLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => useContext(LanguageContext);
