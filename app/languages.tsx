import React from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

import { COLORS } from "@/constants/colors";
import { useLanguage } from "@/contexts/Language";
import { wp, hp } from "@/helpers/common";

import flags from "@/data/flags";

type Language = "en" | "uk";

const LanguagesScreen = () => {
  const insets = useSafeAreaInsets();
  const { language, changeLanguage, t } = useLanguage();

  const handleLanguageChange = (selectedLang: Language) => {
    if (selectedLang !== language) {
      changeLanguage(selectedLang);
      router.back();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 50 }]}>
      <StatusBar style="dark" />

      <View style={styles.innerContainer}>
        <Text style={styles.title}>{t("screens.languages.title")}</Text>
        <View style={styles.langContainer}>
          {flags.map(({ source, lang }) => (
            <TouchableOpacity
              key={lang}
              style={[
                styles.langButton,
                {
                  backgroundColor:
                    lang === language ? COLORS.CREAM : COLORS.WHITE,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => handleLanguageChange(lang as Language)}
            >
              <Image source={source} style={styles.flag} />
              <Text style={styles.langText}>
                {t(`screens.languages.language${lang === "uk" ? "Uk" : "En"}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  innerContainer: {
    padding: 15,
  },
  title: {
    fontSize: hp(2.5),
    fontFamily: "Montserrat-Bold",
    color: "#000",
    marginBottom: 10,
  },
  langContainer: {
    flexDirection: "column",
    gap: 25,
  },
  langButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(2.5),
    paddingHorizontal: wp(2),
    borderRadius: 10,
  },
  flag: {
    width: wp(7.5),
    height: wp(7.5),
    marginRight: 15,
  },
  langText: {
    fontSize: hp(1.75),
    fontFamily: "Montserrat-Bold",
    color: COLORS.BLACK,
  },
});

export default LanguagesScreen;
