import { ConfigContext, ExpoConfig } from "expo/config";
import { version } from "./package.json";

const IS_DEVELOPMENT = process.env.APP_ENV === "development";
const IS_PREVIEW = process.env.APP_ENV === "preview";
const IS_PRODUCTION = !IS_DEVELOPMENT && !IS_PREVIEW;

const EAS_PROJECT_ID = "a2b199c9-6184-4d91-bc6c-1505f038e1c8";
const PROJECT_SLUG = "bookstore";
const OWNER = "v.azarov";

const APP_NAME = "Bookstore";
const BASE_IDENTIFIER = "com.v.azarov.appbookstore";
const BASE_SCHEME = "app-bookstore";

const getEnvSuffix = (): string => {
  return IS_PRODUCTION ? "" : IS_PREVIEW ? ".preview" : ".dev";
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const envSuffix = getEnvSuffix();

  return {
    ...config,
    name: `${APP_NAME}${IS_PRODUCTION ? "" : IS_PREVIEW ? " Preview" : " Development"}`,
    slug: PROJECT_SLUG,
    version,
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: `${BASE_SCHEME}${envSuffix.replace(".", "-")}`,
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: `${BASE_IDENTIFIER}${envSuffix}`,
      config: {
        usesNonExemptEncryption: false,
      },
      icon: {
        dark: "./assets/images/icons/ios-dark.png",
        light: "./assets/images/icons/ios-light.png",
        tinted: "./assets/images/icons/ios-tinted.png",
      },
    },

    android: {
       adaptiveIcon: {
        foregroundImage: "./assets/images/icons/adaptive-icon.png",
        monochromeImage: "./assets/images/icons/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: `${BASE_IDENTIFIER}${envSuffix}`,
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/icons/splash-icon-dark.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            image: "./assets/images/icons/splash-icon-light.png",
            backgroundColor: "#000000",
          },
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
    },

    extra: {
      router: {},
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },

    owner: OWNER,
  };
};
