import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import Step from "../components/Step";

import Field from "@/components/Field";

const Step9 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  return (
    <Step>
      <Field 
        value={form.pageCount}
        onChangeText={(text) => updateForm("pageCount", text)} 
        placeholder={t("modals.createBook.step9.placeholder")}
        isSquared
      />
    </Step>
  );
};

export default Step9;
