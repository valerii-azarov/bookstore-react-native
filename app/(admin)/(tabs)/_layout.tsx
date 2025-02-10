import { Tabs } from "expo-router";
import { colors } from "@/constants/theme";
import { horizontalScale } from "@/helpers/common";
import { useAuthContext } from "@/contexts/AuthContext";

import Typography from "@/components/Typography";
import Notification from "@/components/Notification";

const AdminTabsLayout = () => {
  const { user } = useAuthContext();

  return (
    <Tabs>
      <Tabs.Screen name="books" options={{ title: "Books" }} />
      <Tabs.Screen name="orders" options={{ title: "Orders" }} />
      <Tabs.Screen
        name="menu"
        options={{
          headerTitle: "",
          headerTitleAlign: "left",
          headerStyle: { 
            backgroundColor: colors.white,
          },
          headerLeft: () => (
            <Typography fontSize={20} fontWeight="bold" style={{ marginLeft: horizontalScale(15) }}>
              {`${user?.firstName} ${user?.lastName}`}
            </Typography>
          ),
          headerRight: () => (
            <Notification
              count={5}
              onPress={() => console.log("Notifications clicked")}
              style={{ marginRight: horizontalScale(15) }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AdminTabsLayout;
