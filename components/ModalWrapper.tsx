import { 
  View, 
  ViewStyle, 
  StyleProp, 
  StyleSheet, 
  Platform, 
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";

type ModalWrapperProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const ModalWrapper = ({ children, style }: ModalWrapperProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === "ios" ? insets.top : 15 + insets.top,
          paddingBottom: Platform.OS === "ios" ? insets.bottom : insets.bottom,
        },
        style,
      ]}
    >
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

export default ModalWrapper;
