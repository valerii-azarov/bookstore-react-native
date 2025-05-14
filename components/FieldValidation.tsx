import { View, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";

import Icon from "./Icon";
import Typography from "@/components/Typography";

type FieldValidationProps = {
  isValid: boolean;
  message: string;
};

const FieldValidation = ({ isValid, message }: FieldValidationProps) => (
  <View
    style={[
      styles.container,
      {
        minHeight: 25,
      },
    ]}
  >
    <Icon
      iconSet="Ionicons"
      iconName={isValid ? "checkmark-circle" : "close-circle"}
      iconSize={18}
      iconColor={isValid ? colors.greenTint3 : colors.grayTint3}
    />

    <Typography
      fontSize={14}
      fontWeight="medium"
      color={isValid ? colors.greenTint3 : colors.grayTint3}
    >
      {message}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
  },
});

export default FieldValidation;
