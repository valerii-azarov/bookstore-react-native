import { Tabs } from "expo-router";

const UserTabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name="books" 
        options={{ title: "Books" }} 
      />
      <Tabs.Screen 
        name="search/[query]" 
        options={{ title: "Search" }} 
      />
      <Tabs.Screen 
        name="order-history" 
        options={{ title: "Order History" }}
      />
      <Tabs.Screen 
        name="menu" 
        options={{ title: "Menu" }} 
      />
    </Tabs>
  );
};

export default UserTabsLayout;
