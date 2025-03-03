import React, { useState } from "react";
import { View, ViewStyle, TouchableOpacity, StyleSheet, StyleProp } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";
import { OptionType } from "@/types";

import Input from "./Input";
import Typography from "./Typography";

type MultiSelectDropdownProps = {
  data: OptionType[];
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  searchPlaceholder?: string;
  enableSearch?: boolean;
};

const MultiSelectDropdown = ({
  data,
  selectedValues,
  setSelectedValues,
  style,
  placeholder = "Select item",
  searchPlaceholder = "Search...",
  enableSearch = false,
}: MultiSelectDropdownProps) => {
  const [searchText, setSearchText] = useState("");

  return (
    <MultiSelect
      style={[
        styles.dropdown,
        style,
      ]}
      placeholderStyle={styles.placeholder}
      selectedTextStyle={styles.selectedText}
      iconStyle={styles.icon}
      data={data}
      maxHeight={275}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={selectedValues}
      onChange={setSelectedValues}
      search={enableSearch}
      renderInputSearch={(onSearch) => (
        <Input
          placeholder={searchPlaceholder}
          placeholderTextColor={colors.grayTint5}
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            onSearch(text);
          }}
          iconLeft={
            <Icon name="search-outline" size={24} color={colors.grayTint3} />
          }
          iconRight={
            searchText.length > 0 ? (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setSearchText("");
                  onSearch("");
                }}
              >
                <Icon name="close-outline" size={24} color={colors.gray} />
              </TouchableOpacity>
            ) : undefined
          }
          isSquared
        />
      )}
      renderItem={(item) => (
        <View
          style={[
            styles.item,
            selectedValues.includes(item.value) && styles.selectedItem,
          ]}
        >
          <Typography fontSize={14} fontWeight="medium">
            {item.label}
          </Typography>

          {selectedValues.includes(item.value) && (
            <Icon name="checkmark-outline" size={18} color={colors.orangeTint3} />
          )}
        </View>
      )}
      visibleSelectedItem={false}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: verticalScale(55),
    backgroundColor: colors.white,
    borderColor: colors.grayTint3,
    borderWidth: 1,
    paddingHorizontal: 15,
  },
  placeholder: {
    fontSize: verticalScale(16),
    color: colors.black,
  },
  selectedText: {
    fontSize: verticalScale(14),
    color: colors.black,
  },
  icon: {
    height: verticalScale(30),
    color: colors.grayTint5,
  },
  item: {
    height: verticalScale(55),
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: colors.creamTint8,
  },
  clearButton: {
    backgroundColor: colors.grayTint8,
    borderRadius: 12,
    padding: 4,
  },
});

export default MultiSelectDropdown;
