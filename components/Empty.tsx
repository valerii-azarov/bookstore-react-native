import { View, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";

import Typography from "./Typography";

type EmptyProps = {
  message?: string;
  subMessage?: string;
};

const Empty = ({ message = "Nothing found", subMessage = "Try adjusting your search" }: EmptyProps) => {
  return (
    <View style={styles.container}>
      <Typography fontSize={18} fontWeight="medium" color={colors.gray}>
        {message}
      </Typography>

      <Typography fontSize={16} color={colors.grayTint3} style={styles.message}>
        {subMessage}
      </Typography>
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
  message: {
    marginTop: 5,
    textAlign: "center",
  },
});

export default Empty;
