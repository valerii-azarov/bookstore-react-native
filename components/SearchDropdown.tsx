import { useState, useCallback } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";
import { OptionType } from "@/types";

import Input from "./Input";
import Typography from "./Typography";

type SearchDropdownProps = {
  data: OptionType[];
  onSelect: (option: OptionType | null) => void;
  onSearch: (text: string) => void;
  searchPlaceholder?: string;
  style?: StyleProp<ViewStyle>;
  shape?: "square" | "rounded";
  isLoading?: boolean;
  isEmpty?: boolean;
  isError?: boolean;
  loadingMessage?: string;
  emptyMessage?: string;
  errorMessage?: string;
  disabled?: boolean;
};

const SearchDropdown = ({
  data,
  onSelect,
  onSearch,
  searchPlaceholder = "Search...",
  style,
  shape = "square", 
  isLoading = false,
  isEmpty = false,
  isError = false,
  loadingMessage = "Loading...",
  emptyMessage = "Items not found",
  errorMessage = "An error occurred",
  disabled = false,
}: SearchDropdownProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [pressedItem, setPressedItem] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleSearch = useCallback((text: string) => {
    if (disabled) return;

    setSearchText(text);
    onSearch(text);
  }, [disabled, onSearch]);

  const handleItemPress = useCallback((value: string) => {
    if (disabled) return;
    
    const selectedOption = data.find(item => item.value === value) || null;
    
    onSelect(selectedOption);
    setSearchText(selectedOption?.label || "");
    setIsFocused(false);
  }, [disabled, data, onSelect]);

  return (
    <View style={[styles.container, style]}>
      <Input
        placeholder={searchPlaceholder}
        placeholderTextColor={colors.grayTint5}
        value={searchText}
        onChangeText={handleSearch}
        onFocus={() => !disabled && setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        editable={!disabled}
        iconLeft={
          <Icon name="search-outline" size={24} color={colors.grayTint3} />
        }
        iconRight={
          searchText.length > 0 && !disabled ? (
            <TouchableOpacity 
              onPress={() => {
                setSearchText("");
                onSearch("");
                onSelect(null);
                setIsFocused(true);
              }}
              style={styles.clearButton}
            >
              <Icon name="close-outline" size={24} color={colors.gray} />
            </TouchableOpacity>
          ) : undefined
        }
        containerStyle={
          disabled
            ? {
                backgroundColor: colors.grayTint8,
                opacity: 0.7,
              }
            : undefined
        }
        isSquared={shape === "square"}
      />

      {isFocused && searchText.length > 0 && (
        <FlatList
          data={data}
          renderItem={({ item }: { item: OptionType }) => (
            <TouchableOpacity
              style={[
                styles.dropdownItem,
                pressedItem === item.value && { backgroundColor: colors.grayTint8 },
              ]}
              onPressIn={() => setPressedItem(item.value)}
              onPressOut={() => setPressedItem(null)}
              onPress={() => handleItemPress(item.value)}
              activeOpacity={0.7}
            >
              <Typography fontSize={14} fontWeight="medium">
                {item.label}
              </Typography>
            </TouchableOpacity>
          )}
          keyExtractor={(item: OptionType) => item.value}
          ListFooterComponent={() => {
            const message = isLoading ? loadingMessage : isError ? errorMessage : isEmpty || data.length === 0 ? emptyMessage : null;
            
            return message && (
              <View style={styles.dropdownListFooter}>
                <Typography fontSize={14} fontWeight="medium" color={colors.grayTint5}>
                  {message}
                </Typography>
              </View>
            );
          }}
          style={[
            styles.dropdownList,
            {
              borderRadius: shape === "square" ? 0 : 12,
              borderTopWidth: shape === "square" ? 0 : 1,
              ...(shape !== "square" && { marginTop: 5 }),
            },
          ]}
          keyboardShouldPersistTaps="handled"
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  clearButton: {
    backgroundColor: colors.grayTint8,
    borderRadius: 12,
    padding: 4,
  },
  dropdownList: {
    maxHeight: verticalScale(275),
    backgroundColor: colors.white,
    borderColor: colors.grayTint3,
    borderWidth: 1,
    position: "absolute",
    top: verticalScale(55),
    left: 0,
    right: 0,
    zIndex: 10,
  },
  dropdownItem: {
    height: verticalScale(55),
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownListFooter: {
    padding: 15,
    alignItems: "flex-start",
  },
});

export default SearchDropdown;
