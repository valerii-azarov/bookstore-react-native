import React, { forwardRef } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";

import Input from "./Input";
import Typography from "./Typography";

type FieldProps = React.ComponentProps<typeof Input> & {
  label?: string;
  error?: string;
};

const Field = forwardRef<TextInput, FieldProps>(({ label, error, ...props }, ref) => (
  <View style={{ minHeight: label ? verticalScale(100) : verticalScale(75) }}>
    {label && (
      <Typography fontSize={16} fontWeight="medium" color={colors.grayTint1} style={styles.label}>
        {label}
      </Typography>
    )}

    <Input
      ref={ref}
      containerStyle={{
        borderColor: error ? colors.redTint3 : colors.grayTint3,
      }}
      {...props}
    />

    {error && (
      <Typography fontSize={12} fontWeight="medium" color={colors.redTint3} style={styles.error} numberOfLines={1}>
        {error}
      </Typography>
    )}
  </View>
));

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    marginLeft: 15,
  },
  error: {
    marginLeft: 15,
  },
});

export default Field;
