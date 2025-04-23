import { View, ViewStyle, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";

import Typography from "./Typography";

type EmptyProps = {
  message?: string;
  subMessage?: string;
  containerStyle?: ViewStyle;
  hideSubMessage?: boolean;
};

const Empty = ({
  message = "No data found",
  subMessage = "Please try again later",
  containerStyle,
  hideSubMessage = false,
}: EmptyProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Typography fontSize={18} fontWeight="medium" color={colors.gray} style={styles.message}>
        {message}
      </Typography>
      
      {!hideSubMessage && (
        <Typography fontSize={16} color={colors.grayTint3} style={styles.subMessage}>
          {subMessage}
        </Typography>
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
    textAlign: "center",
  },
  subMessage: {
    marginTop: 5,
    textAlign: "center",
  },
});

export default Empty;
