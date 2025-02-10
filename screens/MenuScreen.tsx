import React from "react";
import { Link } from "expo-router";
import { View, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons as Icon } from "@expo/vector-icons";
import authApi from "@/api/authApi";
import { colors } from "@/constants/theme";
import { horizontalScale, verticalScale } from "@/helpers/common";
import { useAuthContext } from "@/contexts/AuthContext";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { MenuOptionsType } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import Typography from "@/components/Typography";
import Button from "@/components/Button";

const MenuScreen = () => {
  const { t } = useLanguageContext();
  const { isAdmin } = useAuthContext();
  
  const handleLogout = async () => {
    await authApi.logout();
  };

  const confirmLogout = () => {
    Alert.alert(
      t("alerts.confirmLogout.title"),
      t("alerts.confirmLogout.message"),
      [
        {
          text: t("alerts.confirmLogout.cancel"),
          style: "cancel",
        },
        {
          text: t("alerts.confirmLogout.confirm"),
          onPress: handleLogout,
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const menuOptions: MenuOptionsType[] = [
    {
      title: t("screens.menu.profile"),
      icon: <Icon name="person-circle" size={28} color={colors.orange} />,
      route: "/profile",
    },
    {
      title: t("screens.menu.favorites"),
      icon: <Icon name="heart" size={28} color={colors.orange} />,
      route: "/favorites",
      isVisible: !isAdmin,
    },
    {
      title: t("screens.menu.viewingHistory"),
      icon: <Icon name="time" size={28} color={colors.orange} />,
      route: "/viewing-history",
      isVisible: !isAdmin,
    },
    {
      title: t("screens.menu.languages"),
      icon: <Icon name="globe-outline" size={28} color={colors.orange} />,
      route: "/languages",
    },
  ];

  return (
    <ScreenWrapper statusBarStyle="dark" disableTopInset>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>   
        <View style={styles.contentContainer}>
          {!isAdmin && (
            <>
              <Typography fontSize={20} fontWeight="bold" style={styles.title}>
                {t("screens.menu.balance.title")}
              </Typography>

              <Animated.View
                entering={FadeInDown.duration(isAdmin ? 200 : 400)}
                style={styles.infoContainer}
              >
                <TouchableOpacity style={styles.infoItem} activeOpacity={0.8}>
                  <Typography fontSize={24} fontWeight="bold" color={colors.orange}>
                    19.99
                  </Typography>
                  <Typography fontSize={12} fontWeight="regular">
                    {t("screens.menu.balance.bonuses")}
                  </Typography>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoItem} activeOpacity={0.8}>
                  <Typography fontSize={24} fontWeight="bold" color={colors.orange}>
                    0/0
                  </Typography>
                  <Typography fontSize={12} fontWeight="regular">
                    {t("screens.menu.balance.offers")}
                  </Typography>
                </TouchableOpacity>
              </Animated.View>
            </>
          )}

          <Typography fontSize={16} fontWeight="bold" style={styles.title}>
            {t(`screens.menu.${isAdmin ? "admin": "user"}Parameters`)}
          </Typography>

          <View style={styles.menuContainer}>
            {menuOptions.map((option, index) => {
              if (option.isVisible !== false) {
                return (
                  <Animated.View
                    entering={FadeInDown.delay(index * 100)}
                    key={index}
                  >
                    <Link href={option.route} asChild>
                      <TouchableOpacity
                        style={styles.menuItem}
                        activeOpacity={0.6}
                      >
                        {option.icon}
                        <Typography fontSize={14} fontWeight="medium">
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
    marginBottom: verticalScale(20),
    gap: 15,
  },
  infoItem: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: verticalScale(20),
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
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
    gap: 10,
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
