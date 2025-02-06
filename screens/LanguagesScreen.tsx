import { router } from "expo-router";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";
import { useLanguageContext } from "@/contexts/Language";
import { verticalScale } from "@/helpers/common";
import { ImageFlag, Language } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Typography from "@/components/Typography";

const flags: ImageFlag[] = [
  { id: "1", lang: "uk", source: require("@/assets/images/flags/ukraine.png") },
  { id: "2", lang: "en", source: require("@/assets/images/flags/united-kingdom.png") },
];

const LanguagesScreen = () => {
  const { language, changeLanguage, t } = useLanguageContext();

  const handleLanguageChange = (selectedLanguage: Language) => {
    if (selectedLanguage !== language) {
      changeLanguage(selectedLanguage);
      router.back();
    }
  };

  return (
    <ScreenWrapper statusBarStyle="dark">
      <View style={styles.container}>
        <Header
          title={t("screens.languages.header")}
          iconLeft={<BackButton />}
        />

        <View style={styles.languageContainer}>
          <Typography fontSize={18} fontWeight="bold">
            {t("screens.languages.title")}
          </Typography>

          {flags.map(({ source, lang }, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                {
                  backgroundColor:
                    lang === language ? colors.cream : colors.white,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => handleLanguageChange(lang as Language)}
            >
              <Image 
                style={styles.image} 
                source={source}
                resizeMode="cover" 
              />
              <Typography fontSize={14} fontWeight="bold">
                {t(`screens.languages.language${lang === "uk" ? "Uk" : "En"}`)}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  languageContainer: {
    gap: 15,
    marginTop: 20,
  },
  button: {
    padding: verticalScale(15),
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: verticalScale(35),
    height: verticalScale(35),
    marginRight: 15,
  },
});

export default LanguagesScreen;
