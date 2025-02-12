import { router } from "expo-router";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { useAuthContext } from "@/contexts/AuthContext";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { ProfileFieldType } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Typography from "@/components/Typography";

const ProfileScreen = () => {
  const { t } = useLanguageContext();
  const { user } = useAuthContext();

  const profileFields: ProfileFieldType[] = [
    {
      field: "firstName",
      label: t("screens.profile.fields.firstName"),
      value: user?.firstName || "—",
      editable: true,
    },
    {
      field: "lastName",
      label: t("screens.profile.fields.lastName"),
      value: user?.lastName || "—",
      editable: true,
    },
    {
      field: "email",
      label: t("screens.profile.fields.email"),
      value: user?.email || "—",
      editable: false,
    },
  ];

  return (
    <ScreenWrapper statusBarStyle="dark">
      <Header
        title={t("screens.profile.header")}
        iconLeft={
          <BackButton />
        }
        style={styles.headerContainer}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {profileFields.map(({ field, label, value, editable }, index) => (
          <Animated.View 
            key={index}
            entering={FadeInDown.delay(index * 100)} 
            style={styles.profileField}
          >
            <Typography fontSize={14} fontWeight="medium" color={colors.blackTint5}>
              {label}
            </Typography>

            <View style={styles.profileAction}>
              <Typography fontSize={16} fontWeight="bold">
                {value}
              </Typography>

              {editable && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    router.push({
                      pathname: "/(user)/(modals)/edit-profile/[field]",
                      params: { field },
                    })
                  }
                >
                  <Typography fontSize={16} fontWeight="bold" style={styles.linkText}>
                    {t("screens.profile.button")}
                  </Typography>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  profileField: {
    marginBottom: 25,
  },
  profileAction: {
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
