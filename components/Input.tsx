import React, { forwardRef } from "react";
import Animated from "react-native-reanimated";
import { View, ViewStyle, TextStyle, TextInput, TextInputProps, StyleSheet, StyleProp, Platform } from "react-native";
import { colors } from "@/constants/theme";
import { HeightEnum } from "@/constants/common";
import { verticalScale } from "@/helpers/common";
import { HeightType } from "@/types";

const AnimatedView = Animated.createAnimatedComponent(View);

type InputProps = TextInputProps & {
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputHeight?: HeightType;
  isSquared?: boolean;
};

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      iconLeft,
      iconRight,
      containerStyle,
      inputStyle,
      inputHeight = "large",
      isSquared = false,
      ...props
    },
    ref
  ) => {
    return (
      <AnimatedView
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
            inputStyle,
          ]}
          placeholderTextColor={colors.grayTint2}
          ref={ref}
          {...props}
        />

        {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
      </AnimatedView>
    );
  }
);

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
