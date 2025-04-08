import { TouchableOpacity, StyleProp, ViewStyle, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming } from "react-native-reanimated";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

interface IconButtonProps {
  onPress: () => void;
  iconName: keyof typeof Icon.glyphMap;
  iconSize?: number;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  enableAnimation?: boolean;
}

const IconButton = ({ 
  onPress, 
  iconName,
  iconSize = 20,
  iconColor = colors.black,
  style,
  enableAnimation = false,
}: IconButtonProps) => {
  const circleOpacity = useSharedValue(0);
  const circleScale = useSharedValue(0);

  const startAnimation = () => {
    circleOpacity.value = withSequence(
      withTiming(0.6, { duration: 100 }),
      withTiming(0, { duration: 400 })
    );

    circleScale.value = withSequence(
      withTiming(1, { duration: 100 }),
      withTiming(1.2, { duration: 400 })
    );
  };

  const handlePress = () => {
    enableAnimation && startAnimation();
    setTimeout(onPress, enableAnimation ? 500 : 0);
  };

  const animatedCircleStyle = useAnimatedStyle(() => ({
    opacity: circleOpacity.value,
    transform: [{ scale: circleScale.value }],
  }));

  return (
    <TouchableOpacity
      style={[
        styles.container, 
        style
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {enableAnimation && (
        <Animated.View
          style={[
            styles.circle,
            {
              width: iconSize * 1.5,
              height: iconSize * 1.5,
              borderRadius: (iconSize * 1.5) / 2,
            },
            animatedCircleStyle
          ]}
        />
      )}
      
      <Icon name={iconName} size={iconSize} color={iconColor} />
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

export default IconButton;
