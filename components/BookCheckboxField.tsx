import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { colors } from "@/constants/theme";

import Checkbox from "@/components/Checkbox";
import Typography from "@/components/Typography";

type BookCheckboxFieldProps = {
  field: string;
  initialValue: boolean;
  onChange: (value: boolean) => void;
  checkboxColor?: string;
  isCheckboxColorDarker?: boolean;
  isLabelColorWhite?: boolean;
};

const BookCheckboxField = ({ 
  field, 
  initialValue, 
  onChange, 
  checkboxColor = colors.orange,
  isCheckboxColorDarker = false,
  isLabelColorWhite = false,
}: BookCheckboxFieldProps) => {
  const { t } = useLanguageContext();
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = () => {
    setInputValue((prev) => !prev);
    onChange(!inputValue);
  };

  return (
    <View style={styles.container}>
      <Typography fontSize={16} color={isLabelColorWhite ? colors.white : colors.black} style={styles.label}>
        {t(`components.checkboxFields.${field}.label`)}
      </Typography>
      
      <View style={styles.checkbox}>
        <Checkbox
          checked={inputValue}
          onPress={handleChange}
          label={t(`components.checkboxFields.${field}.text`)}
          labelSize={16}
          labelColor={isLabelColorWhite ? colors.white : colors.black}
          iconSize={20}
          iconColor={checkboxColor}
          isColorDarker={isCheckboxColorDarker}
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
