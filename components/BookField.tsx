import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTranslation } from "@/contexts/translateContext";
import { colors } from "@/constants/theme";
import { converter } from "@/helpers/converter";

import Field from "@/components/Field";
import Typography from "@/components/Typography";

type BookFieldProps = {
  field: string;
  initialValue: string;
  onChange: (value: string) => void;
  isLabelColorWhite?: boolean;
  isNumeric?: boolean;
  isInteger?: boolean;
  isEditing?: boolean;
};

const BookField = ({ field, initialValue, onChange, isLabelColorWhite = false, isNumeric = false, isInteger = false, isEditing = false }: BookFieldProps) => {
  const t = useTranslation();
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (text: string) => {
    const value = (isNumeric || isInteger) ? converter.numericInput(text, isInteger) : text;
    if (value !== undefined) {
      setInputValue(value);
      onChange?.(value);
    }
  };  

  return (
    <View style={styles.container}>
      <Typography fontSize={14} color={isLabelColorWhite ? colors.white : colors.black} style={styles.label}>
        {t(`components.fields.${field}.${isEditing ? "label" : "hintLabel"}`)}
      </Typography>

      <Field
        value={inputValue}
        onChangeText={handleChange}
        placeholder={t(`components.fields.${field}.${isEditing ? "placeholder" : "hintPlaceholder"}`)}
        keyboardType={isNumeric ? "numeric" : "default"}
        isSquared
      />
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
});

export default BookField;
