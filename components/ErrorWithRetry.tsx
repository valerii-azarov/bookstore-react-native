import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";

import Typography from "./Typography";

type ErrorWithRetryProps = {
  message?: string;
  subMessage?: string;
  buttonText?: string;
  onRetry: () => void;
};

const ErrorWithRetry = ({ 
  message = "Error occurred", 
  subMessage = "Something went wrong. Please try again",
  buttonText = "Retry",
  onRetry,
}: ErrorWithRetryProps) => {
  return (
    <View style={styles.container}>
      <Icon name="alert-circle-outline" size={32} color={colors.red} style={styles.errorIcon} />
      
      <Typography fontSize={18} fontWeight="medium" color={colors.red}>
        {message}
      </Typography>

      <Typography fontSize={16} color={colors.grayTint3} style={styles.errorMessage}>
        {subMessage}
      </Typography>

      <TouchableOpacity 
        onPress={onRetry}
        style={styles.retryButton}
      >
        <Icon name="refresh-outline" size={20} color={colors.white} style={styles.retryIcon} />
        <Typography fontSize={16} fontWeight="medium" color={colors.white} style={styles.retryText}>
          {buttonText}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  errorIcon: {
    marginBottom: 5,
  },
  errorMessage: {
    marginTop: 5,
    textAlign: "center",
  },
  retryButton: {
    height: verticalScale(45), 
    backgroundColor: colors.orange,
    borderRadius: 15,
    borderCurve: "continuous",
    paddingHorizontal: 25,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  retryIcon: {
    marginRight: 10,
  },
  retryText: {
    letterSpacing: 0.5,
  },
});

export default ErrorWithRetry;
