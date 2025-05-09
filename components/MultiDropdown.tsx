import React, { useState } from "react";
import { MultiSelect } from "react-native-element-dropdown";
import { View, ViewStyle, StyleSheet, StyleProp } from "react-native";
import { colors } from "@/constants/theme";
import { Option, ShapeType } from "@/types";

import Icon from "./Icon";
import Typography from "./Typography";

const colorOptions = [
  colors.amberTint5,
  colors.creamTint3,
  colors.creamTint5,
  colors.orangeTint8,
];

type MultiDropdownProps<T extends string> = {
  options: Option<T>[];
  initialValues: T[];
  onChange: (value: T[]) => void;
  placeholder?: string;
  error?: string | null;
  showTags?: boolean;
  inputStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  shape?: ShapeType;
};

const MultiDropdown = <T extends string>({
  options,
  initialValues,
  onChange,
  placeholder = "Select item",
  error,
  showTags = false,
  inputStyle,
  containerStyle,
  shape = "square",
}: MultiDropdownProps<T>) => {
  const [tags, setTags] = useState<string[]>(initialValues);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (values: string[]) => {
    setTags(values.flatMap((value) => options.find((option) => option.value === value)?.label ?? []));
    onChange(values as T[]);
  };

  const itemHeight = 55;
  const maxItemsLimited = 5;

  const maxHeight = itemHeight * maxItemsLimited;

  return (
    <View style={styles.container}>
      <View>
        <MultiSelect
          style={[
            styles.inputContainer, 
            {
              borderColor: error && !isFocused ? colors.redTint1 : colors.grayTint3,
              borderRadius: shape === "square" ? 0 : 12,
            },
            inputStyle
          ]}
          containerStyle={[
            styles.dropdownContainer,
            {
              borderRadius: shape === "square" ? 0 : 12,
              marginTop: shape === "rounded" ? 5 : 0,
            },
            containerStyle
          ]}
          placeholderStyle={styles.placeholderText}
          selectedTextStyle={styles.selectedItemText}
          iconStyle={styles.dropdownIcon}
          data={options}
          maxHeight={maxHeight}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={initialValues as string[]}
          onChange={handleChange}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          renderItem={(item: Option<T>) => (
            <View
              style={[
                styles.dropdownItem,
                initialValues.includes(item.value) && styles.selectedDropdownItem,
              ]}
            >
              <Typography fontSize={14} fontWeight="medium">
                {item.label}
              </Typography>

              {initialValues.includes(item.value) && (
                <Icon
                  iconSet="MaterialIcons"
                  iconName="check"
                  iconSize={18}
                  iconColor={colors.black}
                />
              )}
            </View>
          )}
          visibleSelectedItem={false}
        />

        {error && !isFocused && (
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

      {showTags && (  
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
  },
  inputContainer: {
    height: 55,
    backgroundColor: colors.white,
    borderWidth: 1,
    paddingHorizontal: 15,
  },
  dropdownContainer: {
    borderColor: colors.grayTint3,
    borderWidth: 1,
    overflow: "hidden",
  },
  dropdownIcon: {
    height: 25,
  },
  dropdownItem: {
    height: 55,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedDropdownItem: {
    backgroundColor: colors.grayTint9,
  },
  placeholderText: {
    fontSize: 16,
    color: colors.black,
  },
  selectedItemText: {
    fontSize: 14,
    color: colors.black,
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

export default MultiDropdown;
