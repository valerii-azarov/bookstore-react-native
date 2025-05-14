import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { asyncStorage } from "@/storages/asyncStorage"; // import { mmkvStorage } from "@/storages/mmkvStorage";
import { LanguageType } from "@/types";

interface LanguageState {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
}

export const useLanguageStore = create<LanguageState>()(
  devtools(
    persist(
      (set) => ({
        language: "en",
        setLanguage: (lang: LanguageType) => set({ language: lang }),
      }),
      {
        name: "language-storage",
        storage: createJSONStorage(() => asyncStorage),
      }
    ),
    { name: "LanguageStore" }
  )
);
