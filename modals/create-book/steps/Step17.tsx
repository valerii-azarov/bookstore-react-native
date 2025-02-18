import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import Step from "../components/Step";

import Field from "@/components/Field";

const Step17 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  return (
    <Step>
      <Field 
        value={form.price}
        onChangeText={(text) => updateForm("price", text)} 
        placeholder={t("modals.createBook.step17.placeholder")}
        isSquared
      />
    </Step>
  );
};

export default Step17;
