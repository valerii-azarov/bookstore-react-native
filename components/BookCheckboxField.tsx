import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { colors } from "@/constants/theme";

import Checkbox from "@/components/Checkbox";
import Typography from "@/components/Typography";

type BookCheckboxFieldProps = {
  field: string;
  initialColor?: string;
  initialValue: boolean;
  onChange: (value: boolean) => void;
};

const BookCheckboxField = ({ field, initialColor = colors.orange, initialValue, onChange }: BookCheckboxFieldProps) => {
  const { t } = useLanguageContext();
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = () => {
    setInputValue((prev) => !prev);
    onChange(!inputValue);
  };

  return (
    <View style={styles.container}>
      <Typography fontSize={16} color={colors.white} style={styles.label}>
        {t(`components.checkboxFields.${field}.label`)}
      </Typography>

      <View style={styles.checkbox}>
        <Checkbox
          checked={inputValue}
          onPress={handleChange}
          label={t(`components.checkboxFields.${field}.text`)}
          labelSize={16}
          labelColor={colors.white}
          iconSize={20}
          iconColor={initialColor}
          isDarkerColor
        />
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
  checkbox: {
    alignItems: "flex-start",
  },
});

export default BookCheckboxField;
