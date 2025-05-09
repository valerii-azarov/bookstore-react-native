import React, { forwardRef } from "react";
import { View, TextInput, TextInputProps, StyleSheet, ViewStyle, StyleProp, TextStyle } from "react-native";
import { colors } from "@/constants/theme";
import { ShapeType } from "@/types";

export type TextareaProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  minHeight?: number;
  maxHeight?: number;
  shape?: ShapeType;
};

const Textarea = forwardRef<TextInput, TextareaProps>(
  (
    {
      containerStyle,
      inputStyle,
      minHeight = 100,
      maxHeight = 200,
      shape = "square",
      ...props
    },
    ref
  ) => {
    return (
      <View
        style={[
          styles.container,
          {
            borderRadius: shape === "square" ? 0 : 12,
          },
          containerStyle,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              minHeight,
              maxHeight,
            },
            inputStyle,
          ]}
          placeholderTextColor={colors.grayTint3}
          ref={ref}
          multiline
          textAlignVertical="top"
          {...props}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.grayTint3,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  input: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.black,
  },
});

export default Textarea;
