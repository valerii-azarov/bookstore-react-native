import { 
  View, 
  ViewStyle, 
  StyleProp, 
  StyleSheet, 
  Platform, 
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";

type ScreenWrapperProps = {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  statusBarBackgroundColor?: string;
  hideStatusBarBackground?: boolean;
  hideStatusBarBorder?: boolean;
  enableFooter?: boolean;
  footerStyle?: StyleProp<ViewStyle>;
};

const ScreenWrapper = ({
  children,
  containerStyle,
  statusBarBackgroundColor = colors.white,
  hideStatusBarBackground = false,
  hideStatusBarBorder = false,
  enableFooter = false,
  footerStyle,
}: ScreenWrapperProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View 
      style={[
        styles.container, 
        containerStyle
      ]}
    >
      <View
        style={[
          styles.statusBar,
          {
            paddingTop: Platform.OS === "ios" ? insets.top : 15 + insets.top,
            backgroundColor: hideStatusBarBackground
              ? "transparent"
              : statusBarBackgroundColor,
            borderBottomWidth: hideStatusBarBorder ? 0 : 1,
          },
        ]}
      />
      
      <View style={styles.content}>
        {children}
      </View>

      {enableFooter && (
        <View 
          style={[
            {
              paddingBottom: insets.bottom,
            },
            footerStyle
          ]}
        />
      )}  
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
