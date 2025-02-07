import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { withRepeat, useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { colors } from "@/constants/theme";

const Index = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSpring(-30, {
        damping: 2,
        stiffness: 100,
        mass: 1,
      }),
      3,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.image, animatedStyle]}
        resizeMode="contain"
        source={require("@/assets/images/icons/book.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.creamTint5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "12%",
    aspectRatio: 1,
  },
});

export default Index;
