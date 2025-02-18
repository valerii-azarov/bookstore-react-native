import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";
import { ItemType } from "@/types";

import Input from "./Input";

type DropdownProps = {
  data: ItemType[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  searchPlaceholder?: string;
  enableSearch?: boolean;
};

const DropdownComponent = ({
  data,
  selectedValue,
  setSelectedValue,
  style,
  placeholder = "Select item",
  searchPlaceholder = "Search...",
  enableSearch = false,
}: DropdownProps) => {
  const [searchText, setSearchText] = useState("");

  return (
    <Dropdown
      style={[styles.dropdown, style]}
      placeholderStyle={styles.placeholder}
      selectedTextStyle={styles.selectedText}
      iconStyle={styles.icon}
      data={data}
      maxHeight={275}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={selectedValue}
      onChange={(item) => setSelectedValue(item.value)}
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
          iconLeft={<Icon name="search-outline" size={24} color={colors.grayTint3} />}
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
  clearButton: {
    backgroundColor: colors.grayTint8,
    borderRadius: 12,
    padding: 4,
  },
});

export default DropdownComponent;
