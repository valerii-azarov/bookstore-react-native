import React, { forwardRef, useState, useEffect } from "react";
import Animated from "react-native-reanimated";
import { View, ViewStyle, TextStyle, TextInput, TextInputProps, StyleSheet, StyleProp, Platform } from "react-native";
import { colors } from "@/constants/theme";
import { HeightEnum } from "@/constants/common";
import { converter } from "@/helpers/converter";
import { HeightType, ShapeType } from "@/types";

const AnimatedView = Animated.createAnimatedComponent(View);

export type InputProps = TextInputProps & {
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputHeight?: HeightType;
  isNumeric?: boolean;
  isInteger?: boolean;
  shape?: ShapeType;
};

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      value,
      onChangeText,
      iconLeft,
      iconRight,
      containerStyle,
      inputStyle,
      inputHeight = "large",
      isNumeric = false,
      isInteger = false,
      shape = "rounded",
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState<string>(value?.toString() || "");
           
    const handleChangeText = (text: string) => {
      const formattedValue  = isNumeric ? converter.formatNumericValue(text, !!isInteger) : text;
      if (formattedValue !== undefined) {
        setInputValue(formattedValue);
        onChangeText?.(formattedValue);
      }   
    }; 

    useEffect(() => {
      if (value) {
        setInputValue(value);
      }
    }, [value]);
    
    return (
      <AnimatedView
        style={[
          styles.container,
          {
            borderRadius: shape === "square" ? 0 : 12,
            height: HeightEnum[inputHeight],
          },
          containerStyle,
        ]}
      >
        {iconLeft && (
          <View style={styles.iconLeft}>
            {iconLeft}
          </View>
        )}

        <TextInput
          value={inputValue}
          onChangeText={handleChangeText}
          style={[
            styles.input,
            {
              flex: 1,
            },
            Platform.OS === "android" && {
              includeFontPadding: false,
              paddingVertical: 0,
            },
            inputStyle,
          ]}
          placeholderTextColor={colors.grayTint3}
          keyboardType={
            isNumeric
              ? Platform.OS === "ios"
                ? isInteger ? "number-pad" : "decimal-pad"
                : "numeric"
              : "default"
          }
          ref={ref}
          {...props}
        />

        {iconRight && (
          <View style={styles.iconRight}>
            {iconRight}
          </View>
        )}
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
    fontSize: 14,
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
