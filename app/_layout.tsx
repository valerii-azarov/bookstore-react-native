import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { TranslateProvider } from "@/contexts/translateContext";

import { useAuthStore } from "@/stores/authStore";
import { selectIsLoggedIn, selectIsAdmin, selectInitialized, selectInitializeAuth } from "@/selectors/authSelectors";

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const isAdmin = useAuthStore(selectIsAdmin);
  const initialized = useAuthStore(selectInitialized);
  const initializeAuth = useAuthStore(selectInitializeAuth);
  
  const [fontsLoaded, fontsError] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  
  useEffect(() => {
    if (!fontsLoaded || fontsError || !initialized) return;
  
    SplashScreen.hideAsync();
  
    const isUserGroup = segments[0] === "(user)";
    const isAdminGroup = segments[0] === "(admin)";
  
    if (isLoggedIn) {
      const shouldRedirect = (isAdmin && !isAdminGroup) || (!isAdmin && !isUserGroup);
      if (shouldRedirect) {
        router.replace(isAdmin ? "/(admin)/(tabs)/books" : "/(user)/(tabs)/books");
      }
    } else {
      router.replace("/welcome");
    }
  }, [fontsLoaded, fontsError, isLoggedIn, isAdmin, initialized]);
  
  if (!fontsLoaded || fontsError || !initialized) return null;

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />

      {/* welcome screen */}
      <Stack.Screen
        name="welcome"
        options={{ headerShown: false }}
      />

      {/* languages screen */}
      <Stack.Screen
        name="languages"
        options={{
          ...(isLoggedIn ? {} : { animation: "fade", animationDuration: 200 }),
          headerShown: false,
        }}
      />

      {/* admin screens */}
      <Stack.Screen name="(admin)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(admin)/book/[bookId]"
        options={{ headerShown: false }}
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
          presentation: "transparentModal",
        }}
      />
      <Stack.Screen
        name="(admin)/(modals)/edit-book/[field]"
        options={{ 
          headerShown: false,
          presentation: "transparentModal",
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
        name="(user)/book/[bookId]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(user)/category-books/[category]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(user)/profile"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(user)/(modals)/edit-profile/[field]"
        options={{
          headerShown: false,
          presentation: "transparentModal",
        }}
      />
      <Stack.Screen
        name="(user)/favorites"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(user)/viewing-history"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(user)/(modals)/cart"
        options={{
          headerShown: false,
          ...(Platform.OS === "ios"
            ? { 
                animation: "slide_from_bottom", 
                animationDuration: 250,
              }
            : {}),
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
          presentation: "transparentModal",
        }} 
      />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <TranslateProvider>
          <InitialLayout />
          <StatusBar style={Platform.OS === "ios" ? "dark" : "light"} />
        </TranslateProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView> 
  );
};

export default RootLayout;
