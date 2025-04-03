import { ViewStyle, TouchableOpacity, TouchableOpacityProps, StyleProp, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";

import Loading from "@/components/Loading";

type ButtonProps = TouchableOpacityProps & {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
};

const Button = ({ children, onPress, style, loading, disabled, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button, 
        disabled && styles.disabledButton,
        style
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loading size="small" /> : children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: verticalScale(55), 
    backgroundColor: colors.orange,  
    borderRadius: 15,
    borderCurve: "continuous",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  disabledButton: {
    backgroundColor: colors.grayTint5,
    opacity: 0.6,
  },
});

export default Button;
