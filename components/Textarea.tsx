import React from "react";
import { View, TextInput, TextInputProps, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";

type TextareaProps = TextInputProps & {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputRef?: React.Ref<TextInput>;
  minHeight?: number;
  maxHeight?: number;
  isSquared?: boolean;
};

const Textarea = ({
  containerStyle,
  inputStyle,
  inputRef,
  minHeight = 100,
  maxHeight = 200,
  isSquared = false,
  ...props
}: TextareaProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[
          styles.input,
          {
            minHeight,
            maxHeight,
            borderRadius: isSquared ? 0 : 16,
          },
          inputStyle,
        ]}
        placeholderTextColor={colors.grayTint2}
        ref={inputRef}
        multiline
        textAlignVertical="top"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.grayTint3,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  input: {
    fontSize: verticalScale(14),
    lineHeight: verticalScale(20),
    color: colors.black,
  },
});

export default Textarea;
