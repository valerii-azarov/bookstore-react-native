import React from "react";
import { Link } from "expo-router";
import Constants from "expo-constants";
import { Alert, View, TouchableOpacity, ScrollView, StyleSheet, Platform } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons as Icon } from "@expo/vector-icons";
import authApi from "@/api/authApi";
import { colors } from "@/constants/theme";
import { horizontalScale, verticalScale } from "@/helpers/common";
import { useAuthContext } from "@/contexts/AuthContext";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { MenuOptionsType } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import IconBadge from "@/components/IconBadge";
import Button from "@/components/Button";
import Typography from "@/components/Typography";

const MenuScreen = () => {
  const { t } = useLanguageContext();
  const { user, isAdmin } = useAuthContext();

  const confirmLogout = () => {
    Alert.alert(
      t("alerts.confirmLogout.title"),
      t("alerts.confirmLogout.message"),
      [
        {
          text: t("alerts.static.cancel"),
          style: "cancel",
        },
        {
          text: t("alerts.static.confirm"),
          style: "destructive",
          onPress: async () => await authApi.logout(),
        },
      ],
      { cancelable: false }
    );
  };

  const menuOptions: MenuOptionsType[] = [
    {
      title: t("screens.menu.profile"),
      icon: <Icon name="person-sharp" size={24} color={colors.orange} />,
      route: "/profile",
      isVisible: !isAdmin,
    },
    {
      title: t("screens.menu.favorites"),
      icon: <Icon name="heart" size={24} color={colors.orange} />,
      route: "/favorites",
      isVisible: !isAdmin,
    },
    {
      title: t("screens.menu.viewingHistory"),
      icon: <Icon name="time" size={24} color={colors.orange} />,
      route: "/viewing-history",
      isVisible: !isAdmin,
    },
    {
      title: t("screens.menu.languages"),
      icon: <Icon name="globe-outline" size={24} color={colors.orange} />,
      route: "/languages",
    },
  ];

  const fadeDuration = menuOptions.filter(option => option.isVisible !== false).length * 100;
  const adjustedFadeDuration = fadeDuration === 100 ? 0 : fadeDuration;

  return (
    <ScreenWrapper statusBarStyle="dark" disableTopInset>
      <Header
        title={`${t("screens.menu.header.welcome")}, ${user?.firstName}`}
        titleSize={18}
        iconRight={
          <IconBadge count={5} iconName="notifications" />
        }
        style={[
          styles.headerContainer, 
          {
            backgroundColor: colors.white,
            borderBottomColor: colors.grayTint7,
            borderBottomWidth: 1,
            minHeight: Platform.OS === "ios" ? verticalScale(100) : verticalScale(85),
          }
        ]}
        enableTopInset
      />
      
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>   
        <View style={styles.contentContainer}>
          {!isAdmin && (
            <Animated.View
              entering={FadeInDown.duration(adjustedFadeDuration)}
              style={styles.infoContainer}
            >
              <TouchableOpacity style={styles.infoItem} activeOpacity={0.8}>
                <Typography fontSize={28} fontWeight="bold" color={colors.orange}>
                  0
                </Typography>
                <Typography fontSize={12} fontWeight="regular">
                  {t("screens.menu.balance.bonuses")}
                </Typography>
              </TouchableOpacity>

              <TouchableOpacity style={styles.infoItem} activeOpacity={0.8}>
                <Typography fontSize={28} fontWeight="bold" color={colors.orange}>
                  0/0
                </Typography>
                <Typography fontSize={12} fontWeight="regular">
                  {t("screens.menu.balance.offers")}
                </Typography>
              </TouchableOpacity>
            </Animated.View>
          )}

          <View style={styles.menuContainer}>
            {menuOptions.map((option, index) => {
              if (option.isVisible !== false) {
                return (
                  <Animated.View
                    key={index}
                    entering={FadeInDown.delay(index * 100)}
                  >
                    <Link href={option.route} asChild>
                      <TouchableOpacity
                        style={styles.menuItem}
                        activeOpacity={0.6}
                      >
                        {option.icon}
                        <Typography fontSize={16} fontWeight="medium">
                          {option.title}
                        </Typography>
                      </TouchableOpacity>
                    </Link>
                  </Animated.View>
                );
              }
              return null;
            })}
          </View>
        </View> 

        <View style={styles.versionContainer}>
          <Typography fontSize={12} fontWeight="medium" color={colors.gray}>
            {`${t("screens.menu.version")} ${Constants.expoConfig?.version}`}
          </Typography>
        </View>

        <View style={styles.buttonContainer}>
          <Button onPress={confirmLogout} style={styles.button}>
            <Typography fontSize={16} fontWeight="bold" color={colors.white}>
              {t("screens.menu.logout")}
            </Typography>
          </Button>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 15,
    // marginBottom: 15,
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 15,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 5,
    marginLeft: 5,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(15),
    gap: 15,
  },
  infoItem: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: verticalScale(25),
    paddingHorizontal: horizontalScale(20),
    flexDirection: "column",
  },
  menuContainer: {
    flexDirection: "column",
    gap: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: verticalScale(20),
    gap: 15,
  },
  versionContainer: {
    marginTop: verticalScale(10),
    alignItems: "center",
  },
  buttonContainer: {
    gap: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
  },
});

export default MenuScreen;
