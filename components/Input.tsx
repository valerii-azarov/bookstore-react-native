import React from "react";
import { View, ViewStyle, TextStyle, TextInput, TextInputProps, StyleSheet, Platform } from "react-native";
import { colors } from "@/constants/theme";
import { HeightEnum } from "@/constants/common";
import { verticalScale } from "@/helpers/common";
import { HeightType } from "@/types";

type InputProps = TextInputProps & {
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputHeight?: HeightType;
  isSquared?: boolean;
  inputRef?: React.Ref<TextInput>;
};

const Input = ({
  iconLeft,
  iconRight,
  containerStyle,
  inputStyle,
  inputHeight = "large",
  isSquared = false,
  inputRef,
  ...props
}: InputProps) => {
  return (
    <View 
      style={[
        styles.container,
        {
          borderRadius: isSquared ? 0 : 16,
          height: verticalScale(HeightEnum[inputHeight]),
        },
        containerStyle,
      ]}
    >
      {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}

      <TextInput
        style={[
          styles.input, 
          Platform.OS === "android" && {
            includeFontPadding: false,
            paddingVertical: 0,
          },
          inputStyle
        ]}
        placeholderTextColor={colors.grayTint2}
        ref={inputRef}
        {...props}
      />

      {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.grayTint3,
    borderWidth: 1,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: verticalScale(14),
    color: colors.black,
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
});

export default Input;
