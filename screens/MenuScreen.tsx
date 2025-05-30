import { View, Alert, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";
import Constants from "expo-constants";
import * as IconSets from "@expo/vector-icons";
import { useIsConnected } from "@/contexts/networkContext";
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
  selectResetAuthOperationState,
} from "@/selectors/authSelectors";
import { colors } from "@/constants/theme";
import { AppRoute, Option, LanguageType } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
// import IconBadge from "@/components/IconBadge";
import Switcher from "@/components/Switcher";
import Typography from "@/components/Typography";

interface MenuItem {
  key: string;
  label: string;
  iconSet: keyof typeof IconSets;
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  textColor?: string;
  route?: AppRoute;
  onPress?: () => void;
  component?: React.ReactNode;
  hideChevron?: boolean;
  isVisible?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const MenuScreen = () => {
  const t = useTranslation();
  const isConnected = useIsConnected();

  const language = useLanguage();
  const setLanguage = useSetLanguage();

  const user = useAuthStore(selectUser);
  const isAdmin = useAuthStore(selectIsAdmin);

  const logout = useAuthStore(selectLogout);
  const resetState = useAuthStore(selectResetAuthOperationState);

  const languageOptions: Option<LanguageType>[] = [
    { label: "Укр", value: "uk" },
    { label: "En", value: "en" },
  ];

  const menuItems: MenuSection[] = [
    // uncomment this in the future
    
    // {
    //   title: t("screens.menu.sections.balance"),
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
        },
      ],
    },
    {
      title: t("screens.menu.sections.settings"),
      items: [
        {
          key: "language",
          label: t("screens.menu.labels.language"),
          iconSet: "MaterialIcons",
          iconName: "language",
          iconSize: 28,
          iconColor: colors.black,
          component: (
            <Switcher<LanguageType>
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
            if (!isConnected) {
              Alert.alert(
                t("common.alerts.noNetwork.title"),
                t("common.alerts.noNetwork.message"),
              );
              return;
            }
            Alert.alert(
              t("screens.menu.alerts.confirmLogout.title"),
              t("screens.menu.alerts.confirmLogout.message"),
              [
                {
                  text: t("screens.menu.alerts.confirmLogout.buttons.cancel"),
                  style: "cancel",
                },
                {
                  text: t("screens.menu.alerts.confirmLogout.buttons.confirm"),
                  style: "destructive",
                  onPress: async () => {
                    logout()
                      .then(() =>
                        Alert.alert(
                          t("screens.menu.alerts.confirmLogout.responses.success.title"),
                          t("screens.menu.alerts.confirmLogout.responses.success.message"),
                          [
                            { 
                              text: "OK", 
                              onPress: () => setTimeout(() => resetState("logout"), 500), 
                            },
                          ]
                        )
                      )
                      .catch((error) => 
                        Alert.alert(
                          t("screens.menu.alerts.confirmLogout.responses.error.title"),
                          error.message || t("screens.menu.alerts.confirmLogout.responses.error.message"),
                        )
                      );
                  },
                },
              ],
              { cancelable: false }
            );
          },
          hideChevron: true,
        },
      ],
    }
  ];

  return (
    <ScreenWrapper hideStatusBarBorder>
      <Header
        title={`${t("screens.menu.header.welcome")}, ${user?.firstName}`}
        titleSize={18}
        // uncomment this in the future

        // iconRight={
        //   <IconBadge 
        //     badgeCount={5} 
        //     badgeIconSet="MaterialIcons"
        //     badgeIconName="notifications" 
        //   />
        // }

        style={{ 
          minHeight: 40,
          backgroundColor: colors.white,
          borderBottomColor: colors.grayTint7,
          borderBottomWidth: 1,
          paddingHorizontal: 15,
        }}
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, padding: 15 }}>
          {menuItems
            .map((section, sectionIndex) => {
              const visibleItems = section.items.filter((item) => item.isVisible !== false);

              if (visibleItems.length === 0) return null;

              return (
                <View key={`section-${sectionIndex}`} style={{ marginBottom: 25 }}>
                  {section.title && (
                    <Typography
                      fontSize={16}
                      fontWeight="medium"
                      color={colors.black}
                      style={{ marginBottom: 5 }}
                    >
                      {section.title}
                    </Typography>
                  )}

                  <View 
                    style={{
                      backgroundColor: colors.white,
                      borderRadius: 10,
                      padding: 15,
                    }}
                  >
                    {visibleItems.map((item, itemIndex, filteredItems) => {
                      const content = (
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          onPress={item.onPress}
                          activeOpacity={0.7}
                          disabled={!!item.component}
                        >
                          <View 
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
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

                          <View 
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
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
                              style={{
                                height: 1.5,
                                backgroundColor: colors.grayTint5,
                                marginVertical: 15,
                                opacity: 0.3,
                              }}
                            />
                          )}
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
        </View>

        <View 
          style={{ 
            alignItems: "center",
            padding: 15,
          }}
        >
          <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
            {`${t("screens.menu.labels.version")} ${Constants.expoConfig?.version}`}
          </Typography>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default MenuScreen;
