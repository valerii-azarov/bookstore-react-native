import { router } from "expo-router";
import { ViewStyle, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

type RefreshButtonProps = {
  onRefresh: () => void;
  style?: ViewStyle;
  iconSize?: number;
}

const RefreshButton = ({ onRefresh, style, iconSize = 24 }: RefreshButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        style
      ]}
      onPress={onRefresh}
    >
      <Icon name="refresh-outline" size={iconSize} color={colors.black} /> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.grayTint7,
    borderRadius: 15,
    borderCurve: "continuous",
    padding: 10,
    alignSelf: "flex-start",
    textAlign: "center",
  },
});


export default RefreshButton;
