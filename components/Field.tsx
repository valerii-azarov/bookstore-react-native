import React, { forwardRef } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { colors } from "@/constants/theme";
import { FieldType } from "@/types";

import Input, { InputProps } from "./Input";
import Textarea, { TextareaProps } from "./Textarea";
import Typography from "./Typography";

type ComponentProps = InputProps | TextareaProps;

type FieldProps = ComponentProps & {
  type: FieldType;
  error?: string | null;
};

const Field = forwardRef<TextInput, FieldProps>(
  (
    { 
      type = "input", 
      error, 
      ...props 
    }, 
    ref
  ) => {
    const Component = type === "input" ? Input : Textarea;

    return (
      <View>
        <Component
          ref={ref}
          containerStyle={{
            borderColor: error ? colors.redTint1 : colors.gray,
          }}
          {...props}
        />

        {error && (
          <Typography
            fontSize={12}
            fontWeight="medium"
            color={colors.redTint1}
            numberOfLines={1}
            style={styles.errorText}
          >
            {error}
          </Typography>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  errorText: {
    marginLeft: 10,
  },
});

export default Field;
