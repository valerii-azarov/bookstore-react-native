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
import * as IconSets from "@expo/vector-icons";
import { colors } from "@/constants/theme";

import Icon from "./Icon";

type IconButtonProps =  TouchableOpacityProps & {
  onPress: () => void;
  buttonIconSet: keyof typeof IconSets;
  buttonIconName: string;
  buttonIconSize?: number;
  buttonIconColor?: string;
  style?: StyleProp<ViewStyle>;
  animated?: boolean;
};

type ButtonRef = React.ComponentRef<typeof TouchableOpacity>;

const IconButton = forwardRef<ButtonRef, IconButtonProps>(
  (
    {
      onPress, 
      buttonIconSet,
      buttonIconName,
      buttonIconSize = 20,
      buttonIconColor = colors.black,
      style,
      animated = false,
      ...props 
    }, 
    ref
  ) => {
    const circleScale = useSharedValue(0);
    const circleOpacity = useSharedValue(0);
    
    const startAnimation = () => {
      circleScale.value = withSequence(
        withTiming(1, { duration: 100 }),
        withTiming(1.2, { duration: 400 })
      );

      circleOpacity.value = withSequence(
        withTiming(0.6, { duration: 100 }),
        withTiming(0, { duration: 400 })
      );
    };

    const handlePress = () => {
      animated && startAnimation();
      setTimeout(onPress, animated ? 500 : 0);
    };

    const animatedCircleStyle = useAnimatedStyle(() => ({
      opacity: circleOpacity.value,
      transform: [{ scale: circleScale.value }],
    }));

    const adjustedSize = buttonIconSize * 1.5;
    const adjustedBorderRadius = (buttonIconSize * 1.5) / 2;

    return (
      <TouchableOpacity
        ref={ref}
        style={[
          styles.container, 
          style
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
        {...props}
      >
        {animated && (
          <Animated.View
            style={[
              styles.circle,
              {
                width: adjustedSize,
                height: adjustedSize,
                borderRadius: adjustedBorderRadius,
              },
              animatedCircleStyle
            ]}
          />
        )}
        
        <Icon 
          iconSet={buttonIconSet}
          iconName={buttonIconName} 
          iconSize={buttonIconSize} 
          iconColor={buttonIconColor}
        />
      </TouchableOpacity>
    );
  }
);

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
