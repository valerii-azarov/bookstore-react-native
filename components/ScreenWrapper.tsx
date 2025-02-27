import { StatusBar } from "expo-status-bar";
import { View, ViewStyle, StyleProp, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";

type ScreenWrapperProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  statusBarStyle?: "auto" | "inverted" | "light" | "dark";
  disableTopInset?: boolean;
};

const ScreenWrapper = ({ children, style, statusBarStyle = "auto", disableTopInset = false }: ScreenWrapperProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: disableTopInset ? 0 : Platform.OS === "ios" ? insets.top : 15 + insets.top,
        },
        style,
      ]}
    >
      <StatusBar style={statusBarStyle} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default ScreenWrapper;
