import React from "react";
import { View, TextInput, TextInputProps, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";

type TextareaProps = TextInputProps & {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputRef?: React.Ref<TextInput>;
  isSquared?: boolean;
  autoGrow?: boolean;
};

const Textarea = ({
  containerStyle,
  inputStyle,
  inputRef,
  isSquared = false,
  autoGrow = false,
  ...props
}: TextareaProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[
          styles.input,
          {
            borderRadius: isSquared ? 0 : 16,
          },
          autoGrow && styles.autoGrow,
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
    minHeight: verticalScale(100),
    backgroundColor: colors.white,
    borderColor: colors.grayTint3,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: verticalScale(14),
    color: colors.black,
  },
  autoGrow: {
    minHeight: verticalScale(100),
    maxHeight: verticalScale(200),
  },
});

export default Textarea;
