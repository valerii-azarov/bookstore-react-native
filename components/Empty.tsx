import { View, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";

import Typography from "./Typography";

type EmptyProps = {
  message?: string;
  subMessage?: string;
  hideSubMessage?: boolean;
};

const Empty = ({
  message = "No data found",
  subMessage = "Please try again later",
  hideSubMessage = false,
}: EmptyProps) => {
  return (
    <View style={[styles.container, styles.padded]}>
      <Typography
        fontSize={18}
        fontWeight="medium"
        color={colors.gray}
        style={styles.message}
      >
        {message}
      </Typography>

      {!hideSubMessage && (
        <Typography
          fontSize={16}
          color={colors.grayTint3}
          style={styles.subMessage}
        >
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
  padded: {
    padding: 15,
  },
});

export default Empty;
