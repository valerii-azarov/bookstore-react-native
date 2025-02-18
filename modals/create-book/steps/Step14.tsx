import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import Step from "../components/Step";

import Field from "@/components/Field";

const Step14 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  return (
    <Step>
      <Field 
        value={form.weight}
        onChangeText={(text) => updateForm("weight", text)} 
        placeholder={t("modals.createBook.step14.placeholder")}
        isSquared
      />
    </Step>
  );
};

export default Step14;
