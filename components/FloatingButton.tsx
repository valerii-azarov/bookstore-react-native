import { ViewStyle, TouchableOpacity, StyleProp, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";

const sizeMap = {
  small: 40,
  medium: 50,
  large: 60,
};

type FloatingButtonProps = {
  onPress: () => void;
  icon: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  size?: "small" | "medium" | "large";
};

const FloatingButton = ({ onPress, icon, style, size = "medium", ...props }: FloatingButtonProps) => {
  const scaledSize = sizeMap[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          width: verticalScale(scaledSize),
          height: verticalScale(scaledSize),
        },
        style,
      ]}
      {...props}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: colors.orange,
    borderColor: colors.orangeTint7,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FloatingButton;
