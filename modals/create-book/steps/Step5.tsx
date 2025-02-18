import { useMemo } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import { languageKeys } from "../constants/commonConstants";
import Step from "../components/Step";

import Dropdown from "@/components/Dropdown";

const Step5 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  const memoizedLanguages = useMemo(() => languageKeys.map((key) => ({
    label: t(`languages.${key}`),
    value: key,
  })), [t]);

  return (
    <Step>
      <Dropdown 
        data={memoizedLanguages}
        placeholder={t("modals.createBook.step5.select")}
        selectedValue={form.language}
        setSelectedValue={(value) => updateForm("language", value)}
      />
    </Step>
  );
};

export default Step5;
