import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import Step from "../components/Step";

import Field from "@/components/Field";

const Step1 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  return (
    <Step>
      <Field 
        value={form.title}
        onChangeText={(text) => updateForm("title", text)} 
        placeholder={t("modals.createBook.step1.placeholder")}
        isSquared
      />
    </Step>
  );
};

export default Step1;
