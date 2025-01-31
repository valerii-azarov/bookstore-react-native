import React from "react";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Platform } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "@/constants/colors";
import { useLanguage } from "@/contexts/Language";
import { wp, hp } from "@/helpers/common";

import flags from "@/data/flags";
import images from "@/data/images";

import ImageSkeleton from "@/components/ImageSkeleton";
import LanguageSkeleton from "@/components/LanguageSkeleton";

const Index = () => {
  const insets = useSafeAreaInsets();
  const { language, t } = useLanguage();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Image Grid */}
      <View style={styles.imageContainer}>
        <FlatList
          data={images}
          renderItem={({ item }) => (
            <View style={styles.imageItem}>
              <ImageSkeleton source={item.source} />
            </View>
          )}
          keyExtractor={(_, index) => `image-${index}`}
          numColumns={3}
          scrollEnabled={false}
        />
      </View>

      {/* Header Status Bar */}
      <LinearGradient
        colors={[
          "rgba(0, 0, 0, 0)",
          "rgba(0, 0, 0, 0.8)",
          "black",
        ]}
        style={{
          top: 0,
          width: wp(100),
          height: insets.top,
          position: "absolute",
        }}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      />

      {/* Language Selector */}
      <View
        style={[
          styles.languageContainer,
          { top: insets.top + wp(1.5), right: wp(1.5) },
        ]}
      >
        <Link href="/languages" asChild>
          <TouchableOpacity activeOpacity={0.8} style={styles.languageButton}>
            <LanguageSkeleton
              source={flags.find((flag) => flag.lang === language)?.source}
            />
          </TouchableOpacity>
        </Link>
      </View>

      {/* Footer */}
      <Animated.View entering={FadeInDown.duration(800)} style={{ flex: 1 }}>
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0)",
            "rgba(255, 255, 255, 0.5)",
            "white",
            "white",
          ]}
          style={{
            bottom: 0,
            width: wp(100),
            height: hp(65),
            position: "absolute",
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.8 }}
        />
        <View style={styles.footerContainer}>
          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            style={styles.title}
          >
            <Text>
              <Text style={{ color: COLORS.ORANGE }}>
                {t("screens.welcome.titleFirst")}
              </Text>
              <Text>
                {t("screens.welcome.titleRemaining")}
              </Text>
            </Text>
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(600).springify()}
            style={styles.subtitle}
          >
            {t("screens.welcome.subtitle")}
          </Animated.Text>

          <Animated.View entering={FadeInDown.delay(800).springify()}>
            <Link href="/sign-in" asChild>
              <TouchableOpacity activeOpacity={0.8} style={styles.button}>
                <Text style={styles.buttonText}>
                  {t("screens.welcome.button")}
                </Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  imageContainer: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  imageItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  languageContainer: {
    right: wp(1.5),
    position: "absolute",
    zIndex: 5,
  },
  languageButton: {
    backgroundColor: COLORS.GRAY_TINT_5,
    borderRadius: 100,
    padding: wp(1),
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: Platform.OS === "ios" ? hp(5) : hp(3),
  },
  title: {
    fontSize: hp(4),
    fontFamily: "Montserrat-Bold",
  },
  subtitle: {
    fontSize: hp(1.5),
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    marginBottom: hp(2),
  },
  button: {
    backgroundColor: COLORS.ORANGE,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(15),
    borderRadius: 30,
    marginBottom: hp(3),
  },
  buttonText: {
    fontSize: hp(2),
    fontFamily: "Montserrat-Bold",
    color: COLORS.WHITE,
  },
});

export default Index;
