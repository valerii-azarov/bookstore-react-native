import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />

      {/* languages screen */}
      <Stack.Screen
        name="languages"
        options={{ headerShown: false }}
      />

      {/* admin screens */}
      <Stack.Screen name="(admin)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(admin)/book/[id]"
        options={{
          title: "Book Details",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="(admin)/order/[id]"
        options={{
          title: "Order Details",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="(admin)/(modals)/create-book"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(admin)/(modals)/edit-book"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(admin)/(modals)/edit-order"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />

      {/* user screens */}
      <Stack.Screen
        name="(user)/(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(user)/book/[id]"
        options={{
          title: "Book Details",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="(user)/profile"
        options={{
          title: "Profile",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="(user)/favorites"
        options={{
          title: "Favorites",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="(user)/viewing-history"
        options={{
          title: "Viewing History",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="(user)/(modals)/cart"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />

      {/* auth screens */}
      <Stack.Screen 
        name="sign-in" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="sign-up" 
        options={{
          headerShown: false,
          presentation: "modal",
        }} 
      />
    </Stack>
  );
};

export default RootLayout;
