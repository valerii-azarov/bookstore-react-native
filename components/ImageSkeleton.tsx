import React, { useEffect, useState } from "react";
import { StyleSheet, Image, ImageSourcePropType, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

import { COLORS } from "@/constants/colors";
import { wp } from "@/helpers/common";

const SPACING = wp(1.5);
const IMAGE_WIDTH = wp(30);
const IMAGE_HEIGHT = wp(45);

const ImageSkeleton = ({ source }: { source: ImageSourcePropType }) => {
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
        resizeMode="cover"
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
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    margin: SPACING,
    backgroundColor: COLORS.GRAY_TINT_5,
    borderRadius: 10,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    margin: SPACING,
  },
  imageLoading: {
    position: "absolute",
  },
});

export default ImageSkeleton;
