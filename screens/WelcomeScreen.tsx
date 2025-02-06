import { useMemo } from "react";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Platform } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { useLanguageContext } from "@/contexts/Language";
import { horizontalScale, verticalScale, widthPercentage, heightPercentage } from "@/helpers/common";
import { ImageBook } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import Typography from "@/components/Typography";

const images: ImageBook[] = [
  { id: "1", source: require("@/assets/images/books/book-001.jpeg") },
  { id: "2", source: require("@/assets/images/books/book-002.jpeg") },
  { id: "3", source: require("@/assets/images/books/book-003.jpeg") },
  { id: "4", source: require("@/assets/images/books/book-004.jpeg") },
  { id: "5", source: require("@/assets/images/books/book-005.jpeg") },
  { id: "6", source: require("@/assets/images/books/book-006.jpeg") },
  { id: "7", source: require("@/assets/images/books/book-007.jpeg") },
  { id: "8", source: require("@/assets/images/books/book-008.jpeg") },
  { id: "9", source: require("@/assets/images/books/book-009.jpeg") },
  { id: "10", source: require("@/assets/images/books/book-010.jpeg") },
  { id: "11", source: require("@/assets/images/books/book-011.jpeg") },
  { id: "12", source: require("@/assets/images/books/book-012.jpeg") },
];

const WelcomeScreen = () => {
  const insets = useSafeAreaInsets();
  const { language, t } = useLanguageContext();

  const shuffledImages = useMemo(() => {
    return [...images].sort(() => Math.random() - 0.5);
  }, [images]);

  return (
    <ScreenWrapper statusBarStyle="light" disableTopInset>
      <FlatList
        data={shuffledImages}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image 
            style={styles.image} 
            source={item.source} 
            resizeMode="cover" 
          />
        )}
        contentContainerStyle={styles.imageContainer}
        scrollEnabled={false}
      />

      {insets.top > 0 && (
        <LinearGradient
          colors={[
            "rgba(0, 0, 0, 0)",
            "rgba(0, 0, 0, 0.8)",
            "black",
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={[styles.topGradient, { height: insets.top }]}
        />
      )}

      <View
        style={[
          styles.languageContainer,
          { 
            top: insets.top, 
            right: 15,
          },
        ]}
      >
        <Link href="/languages" asChild>
          <TouchableOpacity activeOpacity={0.8} style={styles.languageButton}>
            <Typography fontSize={14} fontWeight="bold">
              {language === "uk" ? "UA" : "ENG"}
            </Typography>
            <Icon name="chevron-down-outline" size={14} color={colors.black} marginLeft={5} />
          </TouchableOpacity>
        </Link>
      </View>

      <Animated.View entering={FadeInDown.duration(800)}>
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0)",
            "rgba(255, 255, 255, 0.5)",
            "white",
            "white",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.8 }}
          style={styles.bottomGradient}
        />

        <View style={styles.footerContainer}>
          <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.title}>
            <Typography fontSize={32} fontWeight="bold" color={colors.orange}>
              {t("screens.welcome.titleFirst")}
            </Typography>

            <Typography fontSize={32} fontWeight="bold">
              {t("screens.welcome.titleRemaining")}
            </Typography>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <Typography fontSize={14} fontWeight="regular" color={colors.gray} style={styles.subtitle}>
              {t("screens.welcome.subtitle")}
            </Typography>
          </Animated.View>  

          <Animated.View entering={FadeInDown.delay(800).springify()}>
            <Link href="/sign-in" asChild>
              <TouchableOpacity activeOpacity={0.8} style={styles.button}>
                <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                  {t("screens.welcome.button")}
                </Typography>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        </View>
      </Animated.View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: widthPercentage(100),
    height: heightPercentage(100),
    alignItems: "center",
  },
  image: {
    width: widthPercentage(30),
    height: widthPercentage(45),
    margin: 5,
  },
  topGradient: {
    top: 0,
    width: "100%",
    position: "absolute",
  },
  bottomGradient: {
    bottom: 0,
    width: "100%",
    height: heightPercentage(60),
    position: "absolute",
  },
  languageContainer: {
    position: "absolute",
  },
  languageButton: {
    backgroundColor: colors.grayTint7,
    borderRadius: 15,
    borderCurve: "continuous",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  footerContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? verticalScale(65) : verticalScale(45),
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    marginBottom: verticalScale(15),
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.orange,
    height: verticalScale(50),
    paddingHorizontal: horizontalScale(30),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeScreen;
