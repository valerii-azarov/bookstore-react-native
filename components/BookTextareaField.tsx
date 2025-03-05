import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { colors } from "@/constants/theme";

import Textarea from "@/components/Textarea";
import Typography from "@/components/Typography";

type BookTextareaFieldProps = {
  field: string;
  initialValue: string;
  onChange: (value: string) => void;
  isLabelColorWhite?: boolean;
  isEditing?: boolean;
};

const BookTextareaField = ({ 
  field, 
  initialValue, 
  onChange, 
  isLabelColorWhite = false, 
  isEditing = false,
}: BookTextareaFieldProps) => {
  const { t } = useLanguageContext();
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (text: string) => {
    setInputValue(text);
    onChange?.(text);
  };

  return (
    <View style={styles.container}>
      <Typography fontSize={14} color={isLabelColorWhite ? colors.white : colors.black} style={styles.label}>
        {t(`components.textareaFields.${field}.${isEditing ? "label" : "hintLabel"}`)}
      </Typography>

      <Textarea
        value={inputValue}
        onChangeText={handleChange} 
        placeholder={t(`components.textareaFields.${field}.${isEditing ? "placeholder" : "hintPlaceholder"}`)}
        minHeight={100}
        maxHeight={400}
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

export default BookTextareaField;
