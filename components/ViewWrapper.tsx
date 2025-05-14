import { 
  View,
  ViewStyle, 
  TouchableOpacity, 
  StyleProp,
  StyleSheet,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSequence, 
  withTiming,
} from "react-native-reanimated";
import { colors } from "@/constants/theme";

import Icon from "./Icon";
import Typography from "./Typography";

type ViewWrapperProps = {
  title: string;
  onBackPress: () => void;
  children: React.ReactNode;
  headerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  hideHeaderBorder?: boolean;
  hideFooter?: boolean;
};

const ViewWrapper = ({ 
  title, 
  onBackPress, 
  children, 
  headerStyle, 
  contentStyle, 
  hideHeaderBorder = false, 
  hideFooter = false 
}: ViewWrapperProps) => {
  const insets = useSafeAreaInsets();

  const translateX = useSharedValue(0);
  const circleOpacity = useSharedValue(0);
  const circleScale = useSharedValue(0);

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const circleStyle = useAnimatedStyle(() => ({
    opacity: circleOpacity.value,
    transform: [{ scale: circleScale.value }],
  }));

  const startAnimation = () => {
    translateX.value = withSequence(
      withTiming(-20, { duration: 250 }),
      withTiming(0, { duration: 250 })
    );

    circleOpacity.value = withSequence(
      withTiming(0.3, { duration: 100 }),
      withTiming(0, { duration: 400 })
    );

    circleScale.value = withSequence(
      withTiming(1, { duration: 100 }),
      withTiming(1.2, { duration: 400 })
    );
  };

  const handlePress = () => {
    startAnimation();
    setTimeout(onBackPress, 500);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            borderBottomWidth: hideHeaderBorder ? 0 : 1,
            paddingTop: Platform.OS === "ios" ? insets.top : 15 + insets.top,
            minHeight: Platform.OS === "ios" ? 100 : 85,
          },
          headerStyle,
        ]}
      >
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.7}
          >
            <Animated.View style={[styles.circle, circleStyle]} />
            
            <Animated.View style={arrowStyle}>
              <Icon 
                iconSet="Ionicons"
                iconName="arrow-back-sharp" 
                iconSize={28} 
                iconColor={colors.black} 
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Typography fontSize={18} fontWeight="bold" color={colors.black} numberOfLines={1}>
            {title}
          </Typography>
        </View>

        <View style={styles.spacer} />
      </View>

      <View
        style={[
          styles.content,
          contentStyle,
          hideFooter && {
            paddingBottom: insets.bottom,
          },
        ]}
      >
        {children}
      </View>

      {!hideFooter && (
        <View 
          style={[
            styles.footer, 
            { 
              paddingBottom: insets.bottom,
            }
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
  header: {
    backgroundColor: colors.white,
    borderBottomColor: colors.grayTint7,
    paddingBottom: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButtonContainer: {
    minWidth: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 35,
    height: 35,
    backgroundColor: colors.grayTint5,
    borderRadius: 15,
    borderCurve: "continuous",
    position: "absolute",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  spacer: {
    minWidth: "10%",
  },
  content: {
    flex: 1,
  },
  footer: {
    backgroundColor: colors.white,
  },
});

export default ViewWrapper;
