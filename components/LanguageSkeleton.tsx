import React, { useEffect, useState } from "react";
import { StyleSheet, Image, ImageSourcePropType, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

import { wp } from "@/helpers/common";
import COLORS from "@/constants/colors";

const IMAGE_SIZE = wp(8.5);

const LanguageSkeleton = ({ source }: { source: ImageSourcePropType }) => {
  const [loading, setLoading] = useState(true);

  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <View style={styles.container}>
      {loading && (
        <Animated.View style={[styles.skeleton, animatedStyle]} />
      )}
      <Image
        source={source}
        style={[styles.image, loading && styles.imageLoading]}
        resizeMode="contain"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  skeleton: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    backgroundColor: COLORS.GRAY_DARK,
    borderRadius: 100,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  imageLoading: {
    position: "absolute",
  },
});

export default LanguageSkeleton;
