import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NetworkProvider } from "@/contexts/networkContext";
import { TranslateProvider } from "@/contexts/translateContext";

import { useAuthStore } from "@/stores/authStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { 
  selectIsLoggedIn, 
  selectIsAdmin,
  selectIsRegisteringProgress,
  selectAuthDataLoaded, 
  selectInitializeAuth 
} from "@/selectors/authSelectors";
import { selectFavoritesDataLoaded, selectInitializeFavorites } from "@/selectors/favoritesSelectors";

import { screenHandler } from "@/helpers/screenHandler";
import { appScreens } from "@/router/appScreens";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const isAdmin = useAuthStore(selectIsAdmin);
  const isRegisteringProgress = useAuthStore(selectIsRegisteringProgress);
  const authDataLoaded = useAuthStore(selectAuthDataLoaded);
  const initializeAuth = useAuthStore(selectInitializeAuth);

  const favoritesDataLoaded = useFavoritesStore(selectFavoritesDataLoaded);
  const initializeFavorites = useFavoritesStore(selectInitializeFavorites);
  
  const [fontsLoaded, fontsError] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  useEffect(() => {
    initializeAuth();
    initializeFavorites();
  }, []);
  
  useEffect(() => {
    if (!fontsLoaded || fontsError || !authDataLoaded || !favoritesDataLoaded || isRegisteringProgress) {
      return;
    }

    const timer = setTimeout(() => {
      setAppIsReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [fontsLoaded, fontsError, authDataLoaded, favoritesDataLoaded, isRegisteringProgress]);

  useEffect(() => {
    if (!appIsReady) return;

    SplashScreen.hideAsync();

    const isUserGroup = segments[0] === "(user)";
    const isAdminGroup = segments[0] === "(admin)";

    if (isLoggedIn) {
      const target = isAdmin ? "/(admin)/(tabs)/books" : "/(user)/(tabs)/books";
      if ((isAdmin && !isAdminGroup) || (!isAdmin && !isUserGroup)) {
        router.replace(target);
      }
    } else {
      router.replace("/welcome");
    }
  }, [appIsReady, isLoggedIn, isAdmin]);

  if (fontsError) return null;

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <NetworkProvider>
          <TranslateProvider>
            <StatusBar style="dark" />

            <Stack>
              {appScreens.map((screen, index) => (
                <Stack.Screen 
                  key={index} 
                  name={screen.name} 
                  options={screenHandler.buildScreenOptions(
                    screen.isModal,
                    screen.isTransparent,
                    screen.disableGesture
                  )}
                />
              ))}
            </Stack>
          </TranslateProvider>
        </NetworkProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView> 
  );
};

export default RootLayout;
