import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from "react-native-reanimated";
import { useTranslation } from "@/contexts/translateContext";
import { colors } from "@/constants/theme";

import Icon from "./Icon";
import Typography from "./Typography";

const ErrorNetwork = () => {
  const t = useTranslation();

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
    <View style={[styles.container, styles.padded]}>
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
        {t("components.errorNetwork.title")}
      </Typography>

      <Typography
        fontSize={16}
        color={colors.grayTint1}
        style={styles.subMessage}
      >
        {t("components.errorNetwork.subtitle")}
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
