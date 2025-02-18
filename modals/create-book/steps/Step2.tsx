import { useState, useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import { colorOptions } from "../constants/commonConstants";
import Step from "../components/Step";

import Field from "@/components/Field";
import Typography from "@/components/Typography";

const Step2 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();
  const [inputValue, setInputValue] = useState<string>(form.authors.join(", "));

  const handleChange = useCallback((value: string) => {
    setInputValue(value);

    if (!value.endsWith(",")) {
      updateForm(
        "authors", 
        value.split(",").map((author) => author.trim()).filter(Boolean)
      );
    }
  }, [updateForm]);

  const formattedAuthors = useMemo(() => form.authors, [form.authors]);

  return (
    <Step>
      <Field
        value={inputValue}
        onChangeText={handleChange}
        placeholder={t("modals.createBook.step2.placeholder")}
        isSquared
      />

      <View style={styles.list}>
        {formattedAuthors.map((value, index) => (
          <Typography
            key={index}
            fontSize={16}
            fontWeight="medium"
            style={[
              styles.badge,
              { 
                backgroundColor: colorOptions[index % colorOptions.length] 
              },
            ]}
          >
            {value}
          </Typography>
        ))}
      </View>
    </Step>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badge: {
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Step2;
