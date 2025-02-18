import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import Step from "../components/Step";

import Field from "@/components/Field";

const Step6 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  return (
    <Step>
      <Field 
        value={form.publisher}
        onChangeText={(text) => updateForm("publisher", text)} 
        placeholder={t("modals.createBook.step6.placeholder")}
        isSquared
      />
    </Step>
  );
};

export default Step6;
