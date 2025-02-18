import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import Step from "../components/Step";

import Field from "@/components/Field";

const Step7 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  return (
    <Step>
      <Field 
        value={form.publicationYear}
        onChangeText={(text) => updateForm("publicationYear", text)} 
        placeholder={t("modals.createBook.step7.placeholder")}
        isSquared
      />
    </Step>
  );
};

export default Step7;
