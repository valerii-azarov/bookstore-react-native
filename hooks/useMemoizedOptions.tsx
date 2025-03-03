import { useMemo } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { OptionType } from "@/types";

export const useMemoizedOptions = (keys: string[], prefix: string): OptionType[] => {
  const { t } = useLanguageContext();
  
  const options = useMemo(() => {
    return keys.map((key) => ({
      label: t(`${prefix}.${key}`),
      value: key
    }));
  }, [t, keys, prefix]);

  return options;
};
