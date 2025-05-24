import { Tabs } from "expo-router";
import { useTranslation } from "@/contexts/translateContext";
import { TabType } from "@/types";

import TabBar from "@/components/TabBar";

const AdminTabsLayout = () => {
  const t = useTranslation();

  const tabs: TabType[] = [
    {
      name: "books",
      label: t("tabs.books"),
      iconSet: "Ionicons",
      iconName: "book-outline",
    },
    {
      name: "orders",
      label: t("tabs.orders"),
      iconSet: "Ionicons",
      iconName: "folder-outline",
    },
    {
      name: "menu",
      label: t("tabs.menu"),
      iconSet: "Ionicons",
      iconName: "menu-outline",
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

export default AdminTabsLayout;
