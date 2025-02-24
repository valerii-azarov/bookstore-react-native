import { View, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";

import Loading from "./Loading";

const ListLoader = () => {
  return (
    <View style={styles.container}>
      <Loading size="small" color={colors.orange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
  },
});

export default ListLoader;