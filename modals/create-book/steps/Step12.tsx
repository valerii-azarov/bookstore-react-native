import { useMemo } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import { paperTypeKeys } from "../constants/commonConstants";
import Step from "../components/Step";

import Dropdown from "@/components/Dropdown";

const Step12 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  const memoizedPaperTypes = useMemo(() => paperTypeKeys.map((key) => ({
    label: t(`paperTypes.${key}`),
    value: key,
  })), [t]);

  return (
    <Step>
      <Dropdown 
        data={memoizedPaperTypes}
        placeholder={t("modals.createBook.step12.select")}
        selectedValue={form.paperType}
        setSelectedValue={(value) => updateForm("paperType", value)}
      />
    </Step>
  );
};

export default Step12;
