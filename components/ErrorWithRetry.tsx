import { View, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";

import Icon from "./Icon";
import Typography from "./Typography";

type ErrorWithRetryProps = {
  message?: string;
  subMessage?: string;
  buttonText?: string;
  onRetry?: () => void;
  hideSubMessage?: boolean;
  hideButton?: boolean;
};

const ErrorWithRetry = ({
  message = "An error occurred",
  subMessage = "Something went wrong. Please try again",
  buttonText = "Retry",
  onRetry,
  hideSubMessage = false,
  hideButton = false,
}: ErrorWithRetryProps) => {
  return (
    <View 
      style={[
        styles.container, 
        styles.padded
      ]}
    >
      <Icon
        iconSet="MaterialIcons"
        iconName="error-outline"
        iconSize={32}
        iconColor={colors.redTint1}
      />

      <Typography
        fontSize={18}
        fontWeight="medium"
        color={colors.redTint1}
        style={styles.message}
      >
        {message}
      </Typography>

      {!hideSubMessage && (
        <Typography
          fontSize={16}
          color={colors.grayTint1}
          style={styles.subMessage}
        >
          {subMessage}
        </Typography>
      )}

      {onRetry && !hideButton && (
        <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
          <Icon
            iconSet="MaterialIcons"
            iconName="refresh"
            iconSize={20}
            iconColor={colors.white}
          />

          <Typography
            fontSize={16}
            fontWeight="medium"
            color={colors.white}
            style={styles.retryText}
          >
            {buttonText}
          </Typography>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    marginTop: 10,
    textAlign: "center",
  },
  subMessage: {
    marginTop: 5,
    textAlign: "center",
  },
  retryButton: {
    height: 45,
    backgroundColor: colors.orange,
    borderRadius: 15,
    borderCurve: "continuous",
    paddingHorizontal: 25,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  retryText: {
    letterSpacing: 0.5,
  },
  padded: {
    padding: 15,
  },
});

export default ErrorWithRetry;
