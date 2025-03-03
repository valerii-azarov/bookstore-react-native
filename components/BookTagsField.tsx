import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { colors } from "@/constants/theme";

import Field from "@/components/Field";
import Typography from "@/components/Typography";

const colorOptions = [
  colors.amberTint5,
  colors.creamTint3,
  colors.creamTint5,
  colors.orangeTint8,
];

type BookTagsFieldProps = {
  field: string;
  initialValue: string[];
  onChange: (value: string[]) => void;
  isEditing?: boolean;
};

const BookTagsField = ({ field, initialValue, onChange, isEditing = false }: BookTagsFieldProps) => {
  const { t } = useLanguageContext();
  const [inputValue, setInputValue] = useState(initialValue.join(", "));
  const [tags, setTags] = useState<string[]>(initialValue);

  const handleChange = (value: string) => {
    setInputValue(value);

    if (!value.endsWith(",")) {
      const newValue = value.split(",").map((item) => item.trim()).filter(Boolean);
      setTags(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <View style={styles.container}>
      <Typography fontSize={14} color={colors.white} style={styles.label}>
        {t(`components.tagsFields.${field}.${isEditing ? "hintLabel" : "label"}`)}
      </Typography>

      <Field
        value={inputValue}
        onChangeText={handleChange}
        placeholder={t(`components.tagsFields.${field}.${isEditing ? "hintPlaceholder" : "placeholder"}`)}
        isSquared
      />

      <View style={styles.list}>
        {tags.map((item, index) => (
          <Typography
            key={index}
            fontSize={16}
            fontWeight="medium"
            style={[
              styles.badge,
              { 
                backgroundColor: colorOptions[index % colorOptions.length],
              },
            ]}
          >
            {item}
          </Typography>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    marginBottom: 5,
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

export default BookTagsField;
