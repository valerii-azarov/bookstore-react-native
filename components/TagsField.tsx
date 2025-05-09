import React, { useState, forwardRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";

import Input from "./Input";
import Typography from "./Typography";

const colorOptions = [
  colors.amberTint5,
  colors.creamTint3,
  colors.creamTint5,
  colors.orangeTint8,
];

type TagsFieldProps = {
  initialValue: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string | null;
};

const TagsField = forwardRef<TextInput, TagsFieldProps>(
  (
    { 
      initialValue, 
      onChange, 
      placeholder, 
      error 
    }, 
    ref
  ) => {
    const [inputValue, setInputValue] = useState(initialValue.join(", "));
    const [tags, setTags] = useState<string[]>(initialValue);

    const handleChange = (value: string) => {
      setInputValue(value);

      if (!value.endsWith(",")) {
        const newValue = value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
        setTags(newValue);
        onChange?.(newValue);
      }
    };

    return (
      <View style={styles.container}>
        <View>
          <Input
            ref={ref}
            value={inputValue}
            onChangeText={handleChange}
            placeholder={placeholder}
            containerStyle={{
              borderColor: error ? colors.redTint1 : colors.gray,
            }}
          />

          {error && (
            <Typography
              fontSize={12}
              fontWeight="medium"
              color={colors.redTint1}
              numberOfLines={1}
              style={styles.errorText}
            >
              {error}
            </Typography>
          )}
        </View>

        <View style={styles.tagContainer}>
          {tags.map((item, index) => (
            <Typography
              key={index}
              fontSize={16}
              fontWeight="medium"
              style={[
                styles.tag,
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
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
  },
  errorText: {
    marginLeft: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
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

export default TagsField;
