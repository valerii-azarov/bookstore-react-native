import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
} from "react-native-reanimated";
import { colors } from "@/constants/theme";

import Icon from "./Icon";
import Typography from "./Typography";

type ErrorNetworkProps = {
  message?: string;
  subMessage?: string;
};

const ErrorNetwork = ({
  message = "No Internet Connection",
  subMessage = "Check your network settings and try again",
}: ErrorNetworkProps) => {
  const scale = useSharedValue(1);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.1, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  return (
    <View 
      style={[
        styles.container, 
        styles.padded
      ]}
    >
      <Animated.View style={animatedIconStyle}>
        <Icon
          iconSet="MaterialIcons"
          iconName="wifi-off"
          iconSize={32}
          iconColor={colors.redTint1}
        />
      </Animated.View>

      <Typography
        fontSize={18}
        fontWeight="medium"
        color={colors.redTint1}
        style={styles.message}
      >
        {message}
      </Typography>

      <Typography
        fontSize={16}
        color={colors.grayTint1}
        style={styles.subMessage}
      >
        {subMessage}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    marginTop: 10,
    textAlign: "center",
  },
  subMessage: {
    marginTop: 5,
    textAlign: "center",
  },
  padded: {
    padding: 15,
  },
});

export default ErrorNetwork;
