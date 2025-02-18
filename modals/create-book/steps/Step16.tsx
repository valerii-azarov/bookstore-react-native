import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import Step from "../components/Step";

import ImageUpload from "@/components/ImageUpload";

const Step16 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  return (
    <Step>
      <ImageUpload 
        imageUri={form.coverImage}
        onSelectImage={(uri) => updateForm("coverImage", uri)}
        onClearImage={() => updateForm("coverImage", null)}
        placeholder={t("modals.createBook.step16.placeholder")}
      />
    </Step>
  );
};

export default Step16;
