import React, { forwardRef } from "react";
import { 
  ViewStyle, 
  TouchableOpacity, 
  TouchableOpacityProps, 
  StyleProp, 
  StyleSheet, 
} from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSequence, 
  withTiming,
} from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { WeightType } from "@/types";

import Icon from "./Icon";
import Typography from "./Typography";

type RedirectButtonProps = TouchableOpacityProps & {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textSize?: number;
  textWeight?: WeightType;
  textColor?: string;
  textSpacing?: number;
  arrowSize?: number;
  arrowColor?: string;
};

type ButtonRef = React.ComponentRef<typeof TouchableOpacity>;

const RedirectButton = forwardRef<ButtonRef, RedirectButtonProps>(
  (
    { 
      title, 
      onPress, 
      style, 
      textSize = 14,
      textWeight = "medium",
      textColor = colors.black,
      textSpacing = 10,
      arrowSize = 20,
      arrowColor = colors.black,
      ...props 
    }, 
    ref
  ) => {
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
        ref={ref}
        onPress={handlePress}
        style={[
          styles.button, 
          style
        ]}
        activeOpacity={0.7}
        {...props}
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
  }
);

const styles = StyleSheet.create({
  button: { 
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RedirectButton;
