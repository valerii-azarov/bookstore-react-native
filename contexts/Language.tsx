import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import translations from "@/data/translations";

type Language = "en" | "uk";

type Translations = typeof translations;

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => Promise<void>;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const changeLanguage = async (lang: Language) => {
    setLanguage(lang);
    await AsyncStorage.setItem("language", lang);
  };

  const t = (key: keyof Translations): string => translations[key]?.[language] || key;

  useEffect(() => {
    AsyncStorage.getItem("language").then((savedLanguage) => {
      if (savedLanguage) {
        setLanguage(savedLanguage as Language);
      }
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => useContext(LanguageContext);
