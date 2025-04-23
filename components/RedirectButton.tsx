import { ViewStyle, TouchableOpacity, StyleProp, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming } from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { FontWeight } from "@/types";

import Icon from "./Icon";
import Typography from "@/components/Typography";

type RedirectButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textSize?: number;
  textWeight?: FontWeight;
  textColor?: string;
  textSpacing?: number;
  arrowSize?: number;
  arrowColor?: string;
};

const RedirectButton = ({ 
  title, 
  onPress, 
  style, 
  textSize = 14,
  textWeight = "medium",
  textColor = colors.black,
  textSpacing = 10,
  arrowSize = 20,
  arrowColor = colors.black
}: RedirectButtonProps) => {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const startAnimation = () => {
    translateX.value = withSequence(
      withTiming(-textSpacing, { duration: 250 }),
      withTiming(0, { duration: 250 }),
    );
  };

  const handlePress = () => {
    startAnimation();
    setTimeout(onPress, 500);
  };

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Typography 
        fontSize={textSize} 
        fontWeight={textWeight} 
        color={textColor} 
        style={{ marginRight: textSpacing }}
      >
        {title}
      </Typography>

      <Animated.View style={animatedStyle}>
        <Icon 
          iconSet="Ionicons"
          iconName="arrow-forward-sharp" 
          iconSize={arrowSize} 
          iconColor={arrowColor} 
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { 
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RedirectButton;
