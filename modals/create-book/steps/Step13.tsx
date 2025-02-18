import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import Step from "../components/Step";

import Field from "@/components/Field";

const Step13 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  return (
    <Step>
      <Field 
        value={form.size}
        onChangeText={(text) => updateForm("size", text)} 
        placeholder={t("modals.createBook.step13.placeholder")}
        isSquared
      />
    </Step>
  );
};

export default Step13;
