import { View, Alert, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Constants from "expo-constants";
import {
  useLanguage,
  useSetLanguage,
  useTranslation,
} from "@/contexts/translateContext";
import { useAuthStore } from "@/stores/authStore";
import { 
  selectUser, 
  selectIsAdmin,
  selectLogout,
  selectClearAuthResponse, 
} from "@/selectors/authSelectors";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";
import { Option, Language, MenuSection } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import IconBadge from "@/components/IconBadge";
import Switcher from "@/components/Switcher";
import Typography from "@/components/Typography";

const MenuScreen = () => {
  const t = useTranslation();

  const language = useLanguage();
  const setLanguage = useSetLanguage();

  const user = useAuthStore(selectUser);
  const isAdmin = useAuthStore(selectIsAdmin);

  const logout = useAuthStore(selectLogout);
  const clearAuthResponse = useAuthStore(selectClearAuthResponse);

  const languageOptions: Option<Language>[] = [
    { label: "Укр", value: "uk" },
    { label: "En", value: "en" },
  ];

  const menuItems: MenuSection[] = [
    // uncomment this in the future
    
    // {
    //   title: t("screens.menu.titles.balance"),
    //   items: [
    //     {
    //       key: "bonuses",
    //       label: t("screens.menu.labels.bonuses"),
    //       iconSet: "MaterialIcons",
    //       iconName: "star-outline",
    //       iconSize: 28,
    //       iconColor: colors.black,
    //       route: "/bonuses",
    //       isVisible: !isAdmin,
    //     },
    //     {
    //       key: "offers",
    //       label: t("screens.menu.labels.offers"),
    //       iconSet: "MaterialIcons",
    //       iconName: "local-offer",
    //       iconSize: 28,
    //       iconColor: colors.black,
    //       route: "/offers",
    //       isVisible: !isAdmin,
    //     },
    //   ],
    // },
    
    {
      title: "",
      items: [
        {
          key: "profile",
          label: t("screens.menu.labels.profile"),
          iconSet: "MaterialIcons",
          iconName: "perm-identity",
          iconSize: 28,
          iconColor: colors.black,
          route: "/profile",
          isVisible: !isAdmin,
        },
      ],
    },
    {
      title: "",
      items: [
        {
          key: "favorites",
          label: t("screens.menu.labels.favorites"),
          iconSet: "MaterialIcons",
          iconName: "bookmark-outline",
          iconSize: 28,
          iconColor: colors.black,
          route: "/favorites",
          isVisible: !isAdmin,
        },
        {
          key: "viewingHistory",
          label: t("screens.menu.labels.viewingHistory"),
          iconSet: "MaterialIcons",
          iconName: "access-time",
          iconSize: 28,
          iconColor: colors.black,
          route: "/viewing-history",
          isVisible: !isAdmin,
        },
      ],
    },
    {
      title: t("screens.menu.titles.settings"),
      items: [
        {
          key: "language",
          label: t("screens.menu.labels.language"),
          iconSet: "MaterialIcons",
          iconName: "language",
          iconSize: 28,
          iconColor: colors.black,
          component: (
            <Switcher<Language>
              options={languageOptions}
              selectedValue={language}
              onChange={(value) => {
                if (value !== language) {
                  setLanguage(value);
                }
              }}
            />
          ),
        },
      ],
    },
    {
      title: "",
      items: [
        {
          key: "logout",
          label: t("screens.menu.labels.logout"),
          iconSet: "MaterialIcons",
          iconName: "logout",
          iconSize: 28,
          iconColor: colors.red,
          textColor: colors.red,
          onPress: () => {
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
                  onPress: async () => {
                    await logout()
                      .then(() => {
                        Alert.alert(
                          t("alerts.static.success.title"),
                          t("alerts.confirmLogout.success.message"),
                          [{ text: "OK", onPress: () => setTimeout(() => clearAuthResponse(), 500) }]
                        );
                      })
                      .catch((error) => {
                        Alert.alert(
                          t("alerts.static.error.title"),
                          error.message || t("alerts.confirmLogout.error.message")
                        );
                      });
                  },
                },
              ],
              { cancelable: false }
            );
          },
          hideChevron: true,
        },
      ],
    },
  ];

  return (
    <ScreenWrapper hideStatusBarBorder>
      <Header
        title={`${t("screens.menu.header.welcome")}, ${user?.firstName}`}
        titleSize={18}
        iconRight={
          <IconBadge 
            badgeCount={5} 
            badgeIconSet="MaterialIcons"
            badgeIconName="notifications" 
          />
        }
        style={[
          styles.header,
          {
            minHeight: verticalScale(40),
          },
        ]}
      />

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, styles.padded]}>
          {menuItems
            .map((section, sectionIndex) => {
              const visibleItems = section.items.filter((item) => item.isVisible !== false);

              if (visibleItems.length === 0) return null;

              return (
                <View key={`section-${sectionIndex}`} style={styles.sectionContainer}>
                  {section.title && (
                    <Typography
                      fontSize={16}
                      fontWeight="medium"
                      color={colors.black}
                      style={styles.sectionTitle}>
                      {section.title}
                    </Typography>
                  )}

                  <View style={styles.sectionWrapper}>
                    {visibleItems.map((item, itemIndex, filteredItems) => {
                      const content = (
                        <TouchableOpacity
                          style={styles.menuItem}
                          onPress={item.onPress}
                          activeOpacity={0.7}
                          disabled={!!item.component}
                        >
                          <View style={styles.menuItemLeft}>
                            <Icon
                              iconSet={item.iconSet}
                              iconName={item.iconName}
                              iconSize={item.iconSize}
                              iconColor={item.iconColor}
                            />

                            <Typography
                              fontSize={16}
                              fontWeight="bold"
                              color={item.textColor || colors.black}
                              style={{ marginLeft: 10 }}
                            >
                              {item.label}
                            </Typography>
                          </View>

                          <View style={styles.menuItemRight}>
                            {item.component || (!item.hideChevron && (
                              <Icon
                                iconSet="Ionicons"
                                iconName="chevron-forward"
                                iconSize={24}
                                iconColor={colors.black}
                              />
                            ))}
                          </View>
                        </TouchableOpacity>
                      );

                      return (
                        <View key={`item-${itemIndex}`}>
                          {item.route ? <Link href={item.route} asChild>{content}</Link> : content}

                          {itemIndex < filteredItems.length - 1 && (
                            <View
                              style={[
                                styles.divider,
                                {
                                  marginVertical: 15,
                                },
                              ]}
                            />
                          )}
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })
            .filter(Boolean)}
        </View>

        <View 
          style={[
            styles.padded,
            { 
              alignItems: "center",
            }
          ]}
        >
          <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
            {`${t("screens.menu.version.text")} ${Constants.expoConfig?.version}`}
          </Typography>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    borderBottomColor: colors.grayTint7,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionWrapper: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    marginBottom: 5,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemRight: {
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 1.5,
    backgroundColor: colors.grayTint5,
    opacity: 0.3,
  },
  padded: {
    padding: 15,
  },
});

export default MenuScreen;
