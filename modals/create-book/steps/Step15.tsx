import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import Step from "../components/Step";

import Checkbox from "@/components/Checkbox";

const Step15 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();
  
  return (
    <Step>
      <Checkbox
        checked={form.illustrations} 
        onPress={() => updateForm("illustrations", !form.illustrations)} 
        label={t("modals.createBook.step15.label")}
      />
    </Step>
  );
};

export default Step15;
