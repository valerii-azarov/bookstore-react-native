import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import Step from "../components/Step";

import Textarea from "@/components/Textarea";

const Step3 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  return (
    <Step>
      <Textarea
        value={form.description}
        onChangeText={(text) => updateForm("description", text)} 
        placeholder={t("modals.createBook.step3.placeholder")}
        isSquared
      />
    </Step>
  );
};

export default Step3;
