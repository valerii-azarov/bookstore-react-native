import { useMemo } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import { bookTypeKeys } from "../constants/commonConstants";
import Step from "../components/Step";

import Dropdown from "@/components/Dropdown";

const Step11 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  const memoizedBookTypes = useMemo(() => bookTypeKeys.map((key) => ({
    label: t(`bookTypes.${key}`),
    value: key,
  })), [t]);

  return (
    <Step>
      <Dropdown 
        data={memoizedBookTypes}
        placeholder={t("modals.createBook.step11.select")}
        selectedValue={form.bookType}
        setSelectedValue={(value) => updateForm("bookType", value)}
      />
    </Step>
  );
};

export default Step11;
