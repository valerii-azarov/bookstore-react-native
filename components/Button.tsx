import React from "react";
import { StyleSheet, Image, ImageSourcePropType, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

import { hp } from "@/helpers/common";
import COLORS from "@/constants/colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconSource?: ImageSourcePropType;
  disabled?: boolean;
}

const Button = ({
  title,
  onPress,
  style,
  textStyle,
  iconSource,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabledButton]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      {iconSource && (
        <Image 
          source={iconSource} 
          style={styles.icon} 
        />
      )}
      <Text
        style={[
          styles.buttonText,
          textStyle,
          disabled && styles.disabledButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.ORANGE,
    borderRadius: 12,
    paddingVertical: hp(2),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: COLORS.WHITE,
    marginLeft: 8,
    textAlign: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  disabledButton: {
    backgroundColor: COLORS.GRAY,
    opacity: 0.6,
  },
  disabledButtonText: {
    color: COLORS.GRAY_LIGHT,
  },
});

export default Button;
