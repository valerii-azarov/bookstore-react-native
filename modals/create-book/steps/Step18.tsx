import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import Step from "../components/Step";

import Field from "@/components/Field";

const Step18 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  return (
    <Step>
      <Field 
        value={form.sku}
        onChangeText={(text) => updateForm("sku", text)} 
        placeholder={t("modals.createBook.step18.placeholder")}
        isSquared
      />
    </Step>
  );
};

export default Step18;
