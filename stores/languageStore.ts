import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { asyncStorage } from "@/storages/asyncStorage"; // import { mmkvStorage } from "@/storages/mmkvStorage";
import { Language } from "@/types";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  devtools(
    persist(
      (set) => ({
        language: "en",
        setLanguage: (lang: Language) => set({ language: lang }),
      }),
      {
        name: "language-storage",
        storage: createJSONStorage(() => asyncStorage),
      }
    ),
    { name: "LanguageStore" }
  )
);
