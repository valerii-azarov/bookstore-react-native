import { useState, useMemo } from "react";
import { View, Linking, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "@/contexts/translateContext";
import { useBookStore } from "@/stores/bookStore";
import { selectBook } from "@/selectors/bookSelectors";
import { colors } from "@/constants/theme";

import ModalWrapper from "@/components/ModalWrapper";
import BackButton from "@/components/BackButton";
import Typography from "@/components/Typography";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PADDING = 15;

const HEADER_MIN_HEIGHT = 25;
const HEADER_MAX_HEIGHT = 65;

const MAX_TEXT_WIDTH = SCREEN_WIDTH - 2 * PADDING;

const AUTO_SCROLL_THRESHOLD = 5;
const ANIMATION_DURATION = 100;

const BookCharacteristicsModal = () => {
  const t = useTranslation();
  const book = useBookStore(selectBook);

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
    <ModalWrapper>
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
            {t("modals.bookCharacteristics.title")}
          </Typography>
        </Animated.View>
      </Animated.View>
      
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={contentHeight > layoutHeight}
        onContentSizeChange={(_, height) => setContentHeight(height)}
        onLayout={(event) => {
          const height = event.nativeEvent.layout.height;
          setLayoutHeight(height);
        }}
      >
        <View style={[styles.content, styles.paddedHorizontal]}> 
          <View style={styles.section}>
            <View style={styles.parameterColumn}>
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={colors.gray}
                numberOfLines={1}
                style={{ marginBottom: 2.5 }}
              >
                {t("modals.bookCharacteristics.labels.pageCount")}
              </Typography>

              <Typography
                fontSize={16}
                fontWeight="bold"
                color={colors.black}
                numberOfLines={2}
              >
                {book?.pageCount || "-"}
              </Typography>
            </View>

            <View
              style={[
                styles.divider,
                {
                  marginVertical: 15,
                },
              ]}
            />

            <View style={styles.parameterColumn}>
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={colors.gray}
                numberOfLines={1}
                style={{ marginBottom: 2.5 }}
              >
                {t("modals.bookCharacteristics.labels.publisher")}
              </Typography>

              <Typography
                fontSize={16}
                fontWeight="bold"
                color={colors.black}
                numberOfLines={1}
              >
                {book?.publisher || "-"}
              </Typography>
            </View>

            <View
              style={[
                styles.divider,
                {
                  marginVertical: 15,
                },
              ]}
            />

            <View style={styles.parameterColumn}>
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={colors.gray}
                numberOfLines={1}
                style={{ marginBottom: 2.5 }}
              >
                {t("modals.bookCharacteristics.labels.coverType")}
              </Typography>

              <Typography
                fontSize={16}
                fontWeight="bold"
                color={colors.black}
                numberOfLines={1}
              >
                {book?.coverType ? t(`coverTypes.${book.coverType}`) : "-"}
              </Typography>
            </View>

            <View
              style={[
                styles.divider,
                {
                  marginVertical: 15,
                },
              ]}
            />
            
            <View style={styles.parameterColumn}>
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={colors.gray}
                numberOfLines={1}
                style={{ marginBottom: 2.5 }}
              >
                {t("modals.bookCharacteristics.labels.publicationYear")}
              </Typography>

              <Typography
                fontSize={16}
                fontWeight="bold"
                color={colors.black}
                numberOfLines={1}
              >
                {book?.publicationYear || "-"}
              </Typography>
            </View>

            <View
              style={[
                styles.divider,
                {
                  marginVertical: 15,
                },
              ]}
            />
            
            <View style={styles.parameterColumn}>
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={colors.gray}
                numberOfLines={1}
                style={{ marginBottom: 2.5 }}
              >
                {t("modals.bookCharacteristics.labels.language")}
              </Typography>

              <Typography
                fontSize={16}
                fontWeight="bold"
                color={colors.black}
                numberOfLines={1}
              >
                {book?.language ? t(`languages.${book.language}`) : "-"}
              </Typography>
            </View>

            <View
              style={[
                styles.divider,
                {
                  marginVertical: 15,
                },
              ]}
            />
            
            <View style={styles.parameterColumn}>
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={colors.gray}
                numberOfLines={1}
                style={{ marginBottom: 2.5 }}
              >
                {t("modals.bookCharacteristics.labels.size")}
              </Typography>

              <Typography
                fontSize={16}
                fontWeight="bold"
                color={colors.black}
                numberOfLines={1}
              >
                {book?.size || "-"}
              </Typography>
            </View>

            <View
              style={[
                styles.divider,
                {
                  marginVertical: 15,
                },
              ]}
            />
            
            <View style={styles.parameterColumn}>
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={colors.gray}
                numberOfLines={1}
                style={{ marginBottom: 2.5 }}
              >
                {t("modals.bookCharacteristics.labels.weight")}
              </Typography>

              <Typography
                fontSize={16}
                fontWeight="bold"
                color={colors.black}
                numberOfLines={1}
              >
                {book?.weight || "-"}
              </Typography>
            </View>

            <View
              style={[
                styles.divider,
                {
                  marginVertical: 15,
                },
              ]}
            />
            
            <View style={styles.parameterColumn}>
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={colors.gray}
                numberOfLines={1}
                style={{ marginBottom: 2.5 }}
              >
                {t("modals.bookCharacteristics.labels.illustrations")}
              </Typography>

              <Typography
                fontSize={16}
                fontWeight="bold"
                color={colors.black}
                numberOfLines={1}
              >
                {book?.illustrations ? t(`modals.bookCharacteristics.values.illustrations.${book.illustrations ? "contains" : "notContains"}`) : "-"}
              </Typography>
            </View>

            <View
              style={[
                styles.divider,
                {
                  marginVertical: 15,
                },
              ]}
            />
            
            <View style={styles.parameterColumn}>
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={colors.gray}
                numberOfLines={1}
                style={{ marginBottom: 2.5 }}
              >
                {t("modals.bookCharacteristics.labels.bookType")}
              </Typography>

              <Typography
                fontSize={16}
                fontWeight="bold"
                color={colors.black}
                numberOfLines={1}
              >
                {book?.bookType ? t(`bookTypes.${book.bookType}`) : "-"}
              </Typography>
            </View>

            <View
              style={[
                styles.divider,
                {
                  marginVertical: 15,
                },
              ]}
            />
            
            <View style={styles.parameterColumn}>
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={colors.gray}
                numberOfLines={1}
                style={{ marginBottom: 2.5 }}
              >
                {t("modals.bookCharacteristics.labels.paperType")}
              </Typography>

              <Typography
                fontSize={16}
                fontWeight="bold"
                color={colors.black}
                numberOfLines={1}
              >
                {book?.paperType ? t(`paperTypes.${book.paperType}`) : "-"}
              </Typography>
            </View>

            <View
              style={[
                styles.divider,
                {
                  marginVertical: 15,
                },
              ]}
            />
            
            <View style={styles.parameterColumn}>
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={colors.gray}
                numberOfLines={1}
                style={{ marginBottom: 2.5 }}
              >
                {t("modals.bookCharacteristics.labels.isbn")}
              </Typography>

              <Typography
                fontSize={16}
                fontWeight="bold"
                color={colors.black}
                numberOfLines={1}
              >
                {book?.isbn || "-"}
              </Typography>
            </View>

            <View
              style={[
                styles.divider,
                {
                  marginVertical: 15,
                },
              ]}
            />
            
            <View style={styles.parameterColumn}>
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={colors.gray}
                numberOfLines={1}
                style={{ marginBottom: 2.5 }}
              >
                {t("modals.bookCharacteristics.labels.sku")}
              </Typography>

              <Typography
                fontSize={16}
                fontWeight="bold"
                color={colors.black}
                numberOfLines={1}
              >
                {book?.sku || "-"}
              </Typography>
            </View>
          </View>

          <View style={[styles.notice, { marginTop: 15 }]}>
            <Typography fontSize={16} fontWeight="bold" color={colors.black} style={styles.noticeTitle}>
              {t("modals.bookCharacteristics.messages.notice.title")}
            </Typography>

            <Typography fontSize={14} fontWeight="medium" color={colors.blackTint1}>
              {t("modals.bookCharacteristics.messages.notice.text")}{" "}
              <Typography
                fontSize={14}
                fontWeight="bold"
                color={colors.blackTint1}
                style={{ textDecorationLine: "underline" }}
                onPress={() => Linking.openURL("mailto:support@knigarnya.com")}
              >
                support@knigarnya.com
              </Typography>
            </Typography>
          </View>
        </View>
      </Animated.ScrollView>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
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
  section: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
  },
  parameterColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  divider: {
    height: 1.5,
    backgroundColor: colors.grayTint5,
    opacity: 0.3,
  },
  notice: {
    backgroundColor: colors.orangeTint8,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  noticeTitle: {
    marginBottom: 5,
  },
  paddedHorizontal: {
    paddingHorizontal: 15,
  },
});

export default BookCharacteristicsModal;
