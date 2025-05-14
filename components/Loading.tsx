import {
  View,
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
} from "react-native";
import { colors } from "@/constants/theme";

const Loading = ({ size = "large", color = colors.white, ...props }: ActivityIndicatorProps) => (
  <View style={styles.container}>
    <ActivityIndicator 
      size={size} 
      color={color} 
      {...props} 
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
