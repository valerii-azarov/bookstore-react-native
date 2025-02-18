import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import { genresKeys, colorOptions } from "../constants/commonConstants";
import Step from "../components/Step";

import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import Typography from "@/components/Typography";

const Step4 = () => {
  const { t } = useLanguageContext();
  const { form, updateForm } = useCreateBookFormContext();

  const memoizedGenres = useMemo(() => genresKeys.map((key) => ({
    label: t(`genres.${key}`),
    value: key,
  })), [t]);

  const formattedGenres = useMemo(() => form.genres, [form.genres]);

  return (
    <Step>
      <MultiSelectDropdown
        data={memoizedGenres}
        placeholder={t("modals.createBook.step4.select")}
        searchPlaceholder={t("modals.createBook.step4.search")}
        selectedValues={form.genres}
        setSelectedValues={(value) => updateForm("genres", value)}
        style={styles.select}
        enableSearch
      />

      <View style={styles.list}>
        {formattedGenres.map((value, index) => (
          <Typography
            key={index}
            fontSize={16}
            fontWeight="medium"
            style={[
              styles.badge,
              {
                backgroundColor: colorOptions[value.length % colorOptions.length],
              },
            ]}
          >
            {t(`genres.${value}`)}
          </Typography>
        ))}
      </View>
    </Step>
  );
};

const styles = StyleSheet.create({
  select: {
    marginBottom: 10,
  },
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

export default Step4;
