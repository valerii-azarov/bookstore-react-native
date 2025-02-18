import { useMemo } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import { coverTypeKeys } from "../constants/commonConstants";
import Step from "../components/Step";

import Dropdown from "@/components/Dropdown";

const Step10 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  const memoizedCoverTypes = useMemo(() => coverTypeKeys.map((key) => ({
    label: t(`coverTypes.${key}`),
    value: key,
  })), [t]);

  return (
    <Step>
      <Dropdown 
        data={memoizedCoverTypes}
        placeholder={t("modals.createBook.step10.select")}
        selectedValue={form.coverType}
        setSelectedValue={(value) => updateForm("coverType", value)}
      />
    </Step>
  );
};

export default Step10;
