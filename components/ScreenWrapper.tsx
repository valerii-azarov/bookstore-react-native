import { StatusBar } from "expo-status-bar";
import { View, ViewStyle, StyleProp, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";

type ScreenWrapperProps = {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  statusBarBackgroundColor?: string;
  hideStatusBarBorder?: boolean;
};

const ScreenWrapper = ({
  children,
  containerStyle,
  statusBarBackgroundColor = colors.white,
  hideStatusBarBorder = false,
}: ScreenWrapperProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <View
        style={[
          styles.statusBar,
          {
            paddingTop: Platform.OS === "ios" ? insets.top : 15 + insets.top,
            backgroundColor: statusBarBackgroundColor,
            borderBottomWidth: hideStatusBarBorder ? 0 : 1,
          },
        ]}
      />

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  statusBar: {
    borderBottomColor: colors.grayTint7,
  },
  content: {
    flex: 1,
  },
});

export default ScreenWrapper;
