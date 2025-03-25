import { Translations } from "@/data/translations";

export const languageHandler = {
  getTranslation: (keys: string[], obj: Translations): string | undefined => {
    return keys.reduce<Translations | string | undefined>((acc, key) => {
      if (acc && typeof acc === "object" && key in acc) {
        return (acc as Translations)[key];
      }
      return undefined;
    }, obj) as string | undefined;
  },
};
