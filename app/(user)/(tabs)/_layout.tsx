import { Tabs } from "expo-router";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { TabType } from "@/types";

import TabBar from "@/components/TabBar";

const UserTabsLayout = () => {
  const { t } = useLanguageContext();

  const tabs: TabType[] = [
    {
      name: "books",
      label: t("tabs.books"),
      icon: <Icon name="book-outline" />,
    },
    {
      name: "search/[query]",
      label: t("tabs.search"),
      icon: <Icon name="search-outline" />,
    },
    {
      name: "order-history",
      label: t("tabs.orderHistory"),
      icon: <Icon name="bag-outline" />,
    },
    {
      name: "menu",
      label: t("tabs.menu"),
      icon: <Icon name="menu-outline" />,
    },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ state, navigation }) => {
        return (
          <TabBar
            tabs={tabs}
            activeIndex={state.index}
            onTabPress={(tabName) => {
              const currentRoute = navigation.getState().routes[state.index].name;

              if (currentRoute !== tabName) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: tabName }],
                });
              }
            }}
          />
        );
      }}
    >
      {tabs.map((tab, index) => (
        <Tabs.Screen key={index} name={tab.name} />
      ))}
    </Tabs>
  );
};

export default UserTabsLayout;
