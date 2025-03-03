import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { colors } from "@/constants/theme";

import Dropdown from "@/components/Dropdown";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import Typography from "@/components/Typography";

const colorOptions = [
  colors.amberTint5,
  colors.creamTint3,
  colors.creamTint5,
  colors.orangeTint8,
];

type BookSelectFieldProps = {
  field: string;
  type: "single" | "multiple";
  options: { label: string; value: string }[];
  initialValue: string | string[];
  onChange: (value: string | string[]) => void;
  isEditing?: boolean;
  showSearch?: boolean;
  showSelected?: boolean;
};

const BookSelectField = ({ field, type, options, initialValue, onChange, isEditing = false, showSearch, showSelected }: BookSelectFieldProps) => {
  const { t } = useLanguageContext();
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleChange = (value: string | string[]) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <View style={styles.container}>
      <Typography fontSize={14} color={colors.white} style={styles.label}>
        {t(`components.selectFields.${field}.${isEditing ? "hintLabel" : "label"}`)}
      </Typography>

      {type === "single" && (
        <Dropdown
          data={options}
          placeholder={t(`components.selectFields.${field}.option`)}
          selectedValue={selectedValue as string}
          setSelectedValue={handleChange}
        />
      )}

      {type === "multiple" && (
        <MultiSelectDropdown
          data={options}
          placeholder={t(`components.selectFields.${field}.option`)}
          searchPlaceholder={t("components.selectFields.static.search")}
          selectedValues={selectedValue as string[]}
          setSelectedValues={handleChange}
          style={styles.multiSelect}
          enableSearch={showSearch}
        />
      )}

      {showSelected && type === "multiple" && Array.isArray(selectedValue) && (
        <View style={styles.list}>
          {selectedValue.map((value, index) => options.some(option => option.value === value) && (
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
              {options.find(option => option.value === value)?.label}
            </Typography>
          ))}
        </View>
      )}
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
  multiSelect: {
    marginBottom: 10,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  badge: {
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookSelectField;
