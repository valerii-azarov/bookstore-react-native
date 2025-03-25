import { useLanguageStore } from "@/stores/languageStore";

type LanguageStoreType = ReturnType<typeof useLanguageStore.getState>;

export const selectLanguage = (state: LanguageStoreType) => state.language;
export const selectSetLanguage = (state: LanguageStoreType) => state.setLanguage;
