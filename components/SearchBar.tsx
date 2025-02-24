import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { Height } from "@/constants/common";
import { verticalScale } from "@/helpers/common";
import { ModeType, HeightType } from "@/types";

import Input from "./Input";

type SearchBarProps = {
  searchText: string;
  onSearchChange: (text: string) => void;
  placeholder?: string;
  size?: HeightType;
  mode?: ModeType;
  onToggleMode?: () => void;
};

const SearchBar = ({
  searchText,
  onSearchChange,
  placeholder = "Search...",
  size = "medium",
  mode,
  onToggleMode,
}: SearchBarProps) => {
  const showButton = mode !== undefined && onToggleMode !== undefined;
  const iconSize = Math.min(Height[size] * 0.5, 24);

  return (
    <View style={styles.container}>
      <Input
        placeholder={placeholder}
        placeholderTextColor={colors.grayTint5}
        value={searchText}
        onChangeText={onSearchChange}
        iconLeft={
          <Icon name="search-outline" size={iconSize} color={colors.grayTint3} />
        }
        iconRight={
          searchText.length > 0 ? (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => onSearchChange("")}
            >
              <Icon name="close-outline" size={iconSize} color={colors.gray} />
            </TouchableOpacity>
          ) : undefined
        }
        containerStyle={{
          flex: 1,
          borderColor: colors.grayTint6,
          marginRight: showButton ? 10 : 0,
        }}
        inputHeight={size}
      />

      {showButton && (
        <TouchableOpacity
          style={[
            styles.toggleButton,
            { 
              height: verticalScale(Height[size]),
            },
          ]}
          onPress={onToggleMode}
        >
          <Icon
            name={mode === "grid" ? "menu" : "grid-outline"}
            size={iconSize}
            color={colors.black}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomColor: colors.grayTint7,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: colors.grayTint8,
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    backgroundColor: colors.white,
    borderColor: colors.grayTint6,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchBar;
