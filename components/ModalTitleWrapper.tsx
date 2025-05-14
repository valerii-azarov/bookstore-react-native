import React, { useState, useMemo } from "react";
import { 
  View, 
  ViewStyle, 
  StyleProp, 
  StyleSheet, 
  Dimensions,
  Platform, 
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";

import BackButton from "@/components/BackButton";
import Typography from "@/components/Typography";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PADDING = 15;

const HEADER_MIN_HEIGHT = 25;
const HEADER_MAX_HEIGHT = 65;

const MAX_TEXT_WIDTH = SCREEN_WIDTH - 2 * PADDING;

const AUTO_SCROLL_THRESHOLD = 5;
const ANIMATION_DURATION = 100;

type ModalTitleWrapperProps = {
  title: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
};

const ModalTitleWrapper = ({
  title,
  children,
  style,
  scrollEnabled = true,
}: ModalTitleWrapperProps) => {
  const insets = useSafeAreaInsets();

  const scrollY = useSharedValue(0);
  const animationProgress = useSharedValue(0);
  
  const [textWidth, setTextWidth] = useState<number>(0);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [layoutHeight, setLayoutHeight] = useState<number>(0);
  
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      animationProgress.value = withTiming(
        event.contentOffset.y >= AUTO_SCROLL_THRESHOLD ? 1 : 0,
        { duration: ANIMATION_DURATION }
      );
    },
  });

  const maxTranslateX = useMemo(() => {
    return textWidth >= MAX_TEXT_WIDTH ? 0 : (MAX_TEXT_WIDTH - textWidth) / 2;
  }, [textWidth]);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      animationProgress.value,
      [0, 1],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolate.CLAMP
    );

    return { height };
  });
  
  const textAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationProgress.value, 
      [0, 0.5, 1], 
      [1, 1, 0.9], 
      Extrapolate.CLAMP
    );

    const translateX = interpolate(
      animationProgress.value,
      [0, 1],
      [0, maxTranslateX],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      animationProgress.value,
      [0, 1],
      [HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: Math.min(translateX, MAX_TEXT_WIDTH - textWidth - PADDING) },
        { translateY },
        { scale },
      ],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === "ios" ? insets.top : 15 + insets.top,
          paddingBottom: Platform.OS === "ios" ? insets.bottom : insets.bottom,
        },
        style,
      ]}
    >
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <View style={styles.buttonContainer}>
          <BackButton />
        </View>

        <Animated.View style={[{ alignSelf: "flex-start" }, textAnimatedStyle]}>
          <Typography
            fontSize={20}
            fontWeight="bold"
            color={colors.black}
            onLayout={(event) => {
              const width = event.nativeEvent.layout.width;
              setTextWidth(Math.min(width, MAX_TEXT_WIDTH));
            }}
            style={{ maxWidth: MAX_TEXT_WIDTH }}
          >
            {title}
          </Typography>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled && contentHeight > layoutHeight}
        onContentSizeChange={(_, height) => setContentHeight(height)}
        onLayout={(event) => {
          const height = event.nativeEvent.layout.height;
          setLayoutHeight(height);
        }}
      >
        <View style={[styles.content, styles.paddedHorizontal]}>
          {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: "relative",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  buttonContainer: {
    minWidth: "10%",
    position: "absolute",
    top: 0,
    left: 15,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  paddedHorizontal: {
    paddingHorizontal: 15,
  },
});

export default ModalTitleWrapper;
