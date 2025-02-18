import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import Step from "../components/Step";

import Field from "@/components/Field";

const Step8 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  return (
    <Step>
      <Field 
        value={form.isbn}
        onChangeText={(text) => updateForm("isbn", text)} 
        placeholder={t("modals.createBook.step8.placeholder")}
        isSquared
      />
    </Step>
  );
};

export default Step8;
