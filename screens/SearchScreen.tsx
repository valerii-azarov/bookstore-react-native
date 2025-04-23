import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "@/contexts/translateContext";
import { colors } from "@/constants/theme";

import ScreenWrapper from "@/components/ScreenWrapper";
import Icon from "@/components/Icon";
import Typography from "@/components/Typography";

const SearchScreen = () => {  
  const router = useRouter();

  const t = useTranslation();

  return (
    <ScreenWrapper hideStatusBarBorder>
      <View style={styles.header}>
        <Typography 
          fontSize={24} 
          fontWeight="bold" 
          color={colors.black} 
          style={{ marginBottom: 5 }}
        >
          {t("screens.search.header.text")}
        </Typography>

        <TouchableOpacity
          style={styles.searchInput}
          onPress={() => router.push("/(user)/books-search")}
          activeOpacity={0.7}
        >
          <Icon
            iconSet="Ionicons"
            iconName="search-outline"
            iconSize={24}
            iconColor={colors.grayTint3}
          />

          <Typography
            fontSize={14}
            fontWeight="medium"
            color={colors.grayTint3}
            style={{ marginLeft: 10 }}
          >
            {t(`screens.search.placeholders.title.text`)}
          </Typography>
        </TouchableOpacity>
      </View>

      <View style={[styles.content, styles.padded]}>
        <Typography
          fontSize={24}
          fontWeight="bold"
          color={colors.black}
          style={{ marginBottom: 10, textAlign: "center" }}
        >
          {t(`screens.search.messages.startSearch.text`)}
        </Typography>

        <Typography
          fontSize={16}
          fontWeight="medium"
          color={colors.blackTint5}
          style={{ textAlign: "center" }}
        >
          {t(`screens.search.messages.startSearch.subText`)}
        </Typography>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    borderBottomColor: colors.grayTint7,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchInput: {
    height: 50,
    backgroundColor: colors.grayTint9,
    borderColor: colors.grayTint5,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  padded: {
    padding: 15,
  },
});

export default SearchScreen;
