import { useState, useEffect } from "react";
import { View, Image as ImageComponent, ImageStyle, ViewStyle, StyleSheet, StyleProp } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, interpolateColor } from "react-native-reanimated";
import { useTranslation } from "@/contexts/translateContext";
import { colors } from "@/constants/theme";

import Typography from "./Typography";

type ImageProps = {
  source: { uri: string };
  style?: StyleProp<ImageStyle | ViewStyle>;
  textSize?: number;
  textColor?: string;
  fallbackColor?: string;
  resizeMode?: "cover" | "contain" | "stretch" | "center";
};

const Image = ({ 
  source, 
  style, 
  textSize = 12, 
  textColor = colors.gray,
  fallbackColor = colors.grayTint8,
  resizeMode = "cover"
}: ImageProps) => {
  const t = useTranslation();
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const loadingAnimation = useSharedValue(0);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    if (loading && !error) {
      loadingAnimation.value = withRepeat(
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else {
      loadingAnimation.value = 0;
    }
  }, [loading, error, loadingAnimation]);

  const loadingAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      loadingAnimation.value,
      [0, 1],
      [colors.grayTint8, colors.grayTint6]
    ),
  }));

  return (
    <View style={styles.container}>
      {loading && !error && (
        <Animated.View style={[styles.fallback, style as ViewStyle, loadingAnimatedStyle]} />
      )}
      
      {error && (
        <View 
          style={[
            styles.fallback,
            { 
              backgroundColor: fallbackColor 
            },
            style as ViewStyle
          ]}
        >
          <Typography
            fontSize={textSize}
            color={textColor}
            style={{ textAlign: "center" }}
          >
             {t("components.image.failedToLoad.text")}
          </Typography>
        </View>
      )}

      <ImageComponent
        source={source}
        style={[
          style as ImageStyle,
          error || loading ? styles.hidden : styles.visible,
        ]}
        onLoad={handleLoad}
        onError={handleError}
        resizeMode={resizeMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  fallback: {
    justifyContent: "center",
    alignItems: "center",
  },
  hidden: {
    opacity: 0,
    position: "absolute",
  },
  visible: {
    opacity: 1,
  },
});

export default Image;
