import { router } from "expo-router";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { colors } from "@/constants/theme";
import { useAuthContext } from "@/contexts/AuthContext";
import { useLanguageContext } from "@/contexts/LanguageContext";

import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Typography from "@/components/Typography";

const ProfileScreen = () => {
  const { t } = useLanguageContext();
  const { user } = useAuthContext();

  return (
    <ScreenWrapper statusBarStyle="dark">
      <View style={styles.container}>
        <Header 
          title={t("screens.profile.header")} 
          iconLeft={<BackButton />} 
          style={styles.headerContainer}
        />

        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.profileItem}>
            <Typography fontSize={14} fontWeight="medium" color={colors.blackTint5}>
              {t("screens.profile.fields.firstName")}
            </Typography>
            <View style={styles.profileRow}>
              <Typography fontSize={16} fontWeight="bold">
                {user?.firstName || "—"}
              </Typography>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  router.push({
                    pathname: "/(user)/(modals)/edit-profile/[field]",
                    params: { field: "firstName" },
                  });
                }}
              >
                <Typography fontSize={16} fontWeight="bold" style={styles.linkText}>
                  {t("screens.profile.button")}
                </Typography>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.profileItem}>
            <Typography fontSize={14} fontWeight="medium" color={colors.blackTint5}>
              {t("screens.profile.fields.lastName")}
            </Typography>
            <View style={styles.profileRow}>
              <Typography fontSize={16} fontWeight="bold">
                {user?.lastName || "—"}
              </Typography>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  router.push({
                    pathname: "/(user)/(modals)/edit-profile/[field]",
                    params: { field: "lastName" },
                  });
                }}
              >
                <Typography fontSize={16} fontWeight="bold" style={styles.linkText}>
                  {t("screens.profile.button")}
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  profileItem: {
    marginBottom: 25,
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    textDecorationLine: "underline",
  },
});

export default ProfileScreen;
