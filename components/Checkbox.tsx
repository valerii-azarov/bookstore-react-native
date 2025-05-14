import React, { forwardRef } from "react";
import { 
  View, 
  ViewStyle, 
  TouchableWithoutFeedback, 
  TouchableWithoutFeedbackProps, 
  StyleProp, 
  StyleSheet, 
} from "react-native";
import { colors } from "@/constants/theme";

import Icon from "./Icon";
import Typography from "./Typography";

type CheckboxProps = TouchableWithoutFeedbackProps & {
  checked: boolean;
  onPress: () => void;
  label?: string;
  labelSize?: number;
  labelColor?: string;
  checkboxIconSize?: number;
  checkboxIconColor?: string;
  style?: StyleProp<ViewStyle>;
};

const Checkbox = forwardRef<TouchableWithoutFeedback, CheckboxProps>(
  (
    {
      checked,
      onPress,
      label,
      labelSize = 14,
      labelColor = colors.black,
      checkboxIconSize = 18,
      checkboxIconColor = colors.orange,
      style,
      ...props 
    }, 
    ref
  ) => {
    return (
      <TouchableWithoutFeedback 
        ref={ref}
        onPress={onPress}
        {...props}
      >
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
                width: checkboxIconSize + 7,
                height: checkboxIconSize + 7,
                backgroundColor: checked ? checkboxIconColor : colors.white,
              },
            ]}
          >
            {checked && (
              <Icon 
                iconSet="Ionicons"
                iconName="checkmark" 
                iconSize={checkboxIconSize} 
                iconColor={colors.white} 
              />
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
  }
);

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
