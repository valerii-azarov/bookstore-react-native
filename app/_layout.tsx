import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { Platform, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "@/constants/colors";
import { LanguageProvider } from "@/contexts/Language";

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [fontsLoaded, fontsError] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) return null;

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />

      {/* languages screen */}
      <Stack.Screen
        name="languages"
        options={{
          title: "",
          animation: "fade",
          animationDuration: 200,
          headerLeft: () => (
            <TouchableOpacity onPressOut={() => router.back()}>
              <View
                style={{
                  backgroundColor: COLORS.GRAY_TINT_5,
                  borderRadius: 100,
                }}
              >
                <Ionicons name="close-outline" size={34} color={"black"} />
              </View>
            </TouchableOpacity>
          ),
          // headerShown: false,
          headerTransparent: true,
        }}
      />

      {/* admin screens */}
      <Stack.Screen name="(admin)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(admin)/book/[id]"
        options={{
          headerShown: true,
          title: "Book Details",
        }}
      />
      <Stack.Screen
        name="(admin)/order/[id]"
        options={{
          headerShown: true,
          title: "Order Details",
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
          headerShown: true,
          title: "Book Details",
        }}
      />
      <Stack.Screen
        name="(user)/favorites"
        options={{
          headerShown: true,
          title: "Favorites",
        }}
      />
      <Stack.Screen
        name="(user)/profile"
        options={{
          headerShown: true,
          title: "Profile",
        }}
      />
      <Stack.Screen
        name="(user)/viewing-history"
        options={{
          headerShown: true,
          title: "Viewing History",
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
          title: "",
          headerShown: true,
          presentation: "modal",
          headerLeft: Platform.OS === "ios" ? () => (
            <TouchableOpacity onPressOut={() => router.back()}>
              <View 
                style={{ 
                  backgroundColor: COLORS.GRAY_TINT_5, 
                  borderRadius: 100,
                }}
              >
                <Ionicons name="close-outline" size={32} color="black" />
              </View>
            </TouchableOpacity>
          ) : undefined,
          headerTransparent: Platform.OS === "ios",
          headerStyle: Platform.OS === "ios" ? { backgroundColor: COLORS.CREAM_LIGHT } : undefined,
        }} 
      />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <InitialLayout />
        <StatusBar style={Platform.OS === "ios" ? "dark" : "light"} />
      </LanguageProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
