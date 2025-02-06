import { View, StyleSheet } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

import Typography from "@/components/Typography";

interface FieldValidationProps {
  isValid: boolean;
  message: string;
}

const FieldValidation = ({ isValid, message }: FieldValidationProps) => (
  <View style={styles.container}>
    <Icon
      name={isValid ? "checkmark-circle" : "close-circle"}
      size={18}
      color={isValid ? colors.greenTint3 : colors.grayTint3}
      style={styles.icon}
    />
    <Typography fontSize={14} fontWeight="medium" color={isValid ? colors.greenTint3 : colors.grayTint3}>
      {message}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {
    minHeight: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
});

export default FieldValidation;
