import { ViewStyle, TouchableOpacity, StyleProp, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

type BackButtonProps = {
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  circleScaleFactor?: number;
};

const BackButton = ({ style, iconSize = 28, circleScaleFactor = 1.25 }: BackButtonProps) => {
  const router = useRouter();

  const translateX = useSharedValue(0);
  const circleOpacity = useSharedValue(0);
  const circleScale = useSharedValue(0);

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
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
    setTimeout(() => router.back(), 500);
  };

  const animatedCircleStyle = useAnimatedStyle(() => ({
    opacity: circleOpacity.value,
    transform: [{ scale: circleScale.value }],
  }));

  const circleSize = iconSize * circleScaleFactor;

  return (
    <TouchableOpacity
      style={[
        styles.container, 
        style
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
          },
          animatedCircleStyle
        ]}
      />

      <Animated.View style={arrowStyle}>
        <Icon 
          name="arrow-back-sharp" 
          size={iconSize} 
          color={colors.black} 
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: colors.grayTint5,
    borderCurve: "continuous",
    position: "absolute",
  },
});

export default BackButton;
