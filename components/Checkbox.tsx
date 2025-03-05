import { View, ViewStyle, TouchableWithoutFeedback, StyleProp, StyleSheet } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { colorConverter } from "@/helpers/colorConverter";
import { verticalScale } from "@/helpers/common";

import Typography from "./Typography";

type CheckboxProps = {
  checked: boolean;
  onPress: () => void;
  label?: string;
  labelSize?: number;
  labelColor?: string;
  iconSize?: number;
  iconColor?: string;
  isColorDarker?: boolean;
  style?: StyleProp<ViewStyle>;
};

const Checkbox = ({
  checked,
  onPress,
  label,
  labelSize = 14,
  labelColor = colors.black,
  iconSize = 18,
  iconColor = colors.orange,
  isColorDarker = false,
  style,
}: CheckboxProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View 
        style={[
          styles.container, 
          style,
        ]}
      >
        <View
          style={[
            styles.checkbox,
            {
              width: verticalScale(iconSize + 7),
              height: verticalScale(iconSize + 7),
              backgroundColor: checked ? isColorDarker ? colorConverter.darkerHexColor(iconColor) : iconColor : colors.white,
            },
          ]}
        >
          {checked && (
            <Icon name="checkmark" size={iconSize} color={colors.white} />
          )}
        </View>
        {label && (
          <Typography
            fontSize={labelSize}
            fontWeight="medium"
            color={labelColor}
            style={styles.label}
          >
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
    borderColor: colors.grayTint3,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginLeft: 10,
  },
});

export default Checkbox;
