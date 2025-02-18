import { View, ViewStyle, TouchableWithoutFeedback, StyleProp, StyleSheet } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";

import Typography from "./Typography";

type CheckboxProps = {
  checked: boolean;
  onPress: () => void;
  label?: string;
  style?: StyleProp<ViewStyle>;
  size?: number;
};
const Checkbox = ({ checked, onPress, label, style, size = 18 }: CheckboxProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View 
        style={[
          styles.container,
          style,
        ]}
      >
        <View style={[
          styles.checkbox,
          checked ? styles.checked : styles.unchecked,
        ]}>
          {checked && <Icon name="checkmark" size={size} color={colors.white} />}
        </View>
        {label && (
          <Typography fontWeight="medium" style={styles.label}>
            {label}
          </Typography>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: verticalScale(25),
    height: verticalScale(25),
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.grayTint3,
  },
  checked: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
  unchecked: {
    backgroundColor: colors.white,
  },
  label: {
    marginLeft: 10,
  },
});
export default Checkbox;