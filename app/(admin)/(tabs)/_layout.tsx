import { Tabs } from "expo-router";

const AdminTabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name="books" 
        options={{ title: "Books" }} 
      />
      <Tabs.Screen 
        name="orders" 
        options={{ title: "Orders" }} 
      />
      <Tabs.Screen 
        name="menu" 
        options={{ title: "Menu" }} 
      />
    </Tabs>
  );
};

export default AdminTabsLayout;
