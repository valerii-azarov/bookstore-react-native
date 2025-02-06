import { StatusBar } from "expo-status-bar";
import { View, ViewStyle, StyleSheet, Platform } from "react-native";
import { colors } from "@/constants/theme";

type ModalWrapperProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const ModalWrapper = ({ children, style }: ModalWrapperProps) => {
  return (
    <View
      style={[
        styles.container,
        style,
      ]}
    >
      <StatusBar style={Platform.OS === "ios" ? "light" : "dark"} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "ios" ? 15 : 50,
    paddingBottom: Platform.OS === "ios" ? 25 : 15,
  },
});

export default ModalWrapper;
