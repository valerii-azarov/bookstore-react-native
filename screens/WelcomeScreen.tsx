import { useState, useMemo, useEffect } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Link } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import {
  useLanguage,
  useSetLanguage,
  useTranslation,
} from "@/contexts/translateContext";
import { useImagesStore } from "@/stores/imagesStore";
import { 
  selectCoverImages,
  selectCoverImagesStatus,
  selectCoverImagesResponse,
  selectLoadCoverImages, 
} from "@/selectors/imagesSelectors";
import { colors } from "@/constants/theme";

import ScreenWrapper from "@/components/ScreenWrapper";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Typography from "@/components/Typography";

const WelcomeScreen = () => {
  const t = useTranslation();
  const isConnected = useIsConnected();

  const language = useLanguage();
  const setLanguage = useSetLanguage();

  const coverImages = useImagesStore(selectCoverImages);
  const coverImagesStatus = useImagesStore(selectCoverImagesStatus);
  const coverImagesResponse = useImagesStore(selectCoverImagesResponse);

  const loadCoverImages = useImagesStore(selectLoadCoverImages);

  const isLoading = coverImagesStatus === "loading";
  const isError = !isLoading && coverImagesResponse?.status === "error";

  const [contentSize, setContentSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const maxImages = Math.min(coverImages.length, 9);

  const numColumns = maxImages > 0 ? Math.ceil(Math.sqrt(maxImages)) : 1;
  const numRows = maxImages > 0 ? Math.ceil(maxImages / numColumns) : 1;

  const margin = 5;
  
  const adjustedWidth = contentSize.width - 2 * margin * (numColumns + 1);
  const adjustedHeight = contentSize.height - 2 * margin * (numRows + 1);
  
  const imageWidth = numColumns > 0 ? adjustedWidth / numColumns : adjustedWidth;
  const imageHeight = numRows > 0 ? adjustedHeight / numRows : adjustedHeight;

  const shuffledImages = useMemo(() => {
    return [...coverImages].sort(() => Math.random() - 0.5).slice(0, maxImages);
  }, [coverImages]);
  
  useEffect(() => {
    if (isConnected) {
      loadCoverImages();
    }
  }, [isConnected]);
  
  return (
    <ScreenWrapper 
      containerStyle={{ backgroundColor: colors.white }}
      hideStatusBarBackground
      hideStatusBarBorder
    >
      <View style={styles.langContainer}>
        <TouchableOpacity 
          onPress={() => {
            setLanguage(language === "uk" ? "en" : "uk");
          }}
          style={styles.langButton}
          activeOpacity={0.7}
        >
          <Typography fontSize={14} fontWeight="bold" color={colors.black} style={{ marginRight: 5 }}>
            {language === "uk" ? "UA" : "ENG"}
          </Typography>

          <Icon 
            iconSet="MaterialIcons"
            iconName="language"
            iconSize={18} 
            iconColor={colors.black} 
          />
        </TouchableOpacity>
      </View>
      
      <View 
        style={styles.content} 
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setContentSize({ width, height });
        }}
      >
        {coverImages.length > 0 && !isError && (
          <FlatList
            data={shuffledImages}
            keyExtractor={(item, index) => `${item}-${index}`}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <Image 
                source={{ uri: item }}  
                style={{
                  width: imageWidth,
                  height: imageHeight,
                  margin: 5,
                }} 
                resizeMode="cover" 
              />
            )}
            contentContainerStyle={styles.imageContainer}
            scrollEnabled={false}
            initialNumToRender={maxImages}
            windowSize={5}
          />
        )}
      </View>

      <View style={styles.footer}>
        <View style={{ flexDirection: "row" }}>
          <Typography fontSize={32} fontWeight="bold" color={colors.orange}>
            {t("screens.welcome.title.first")}
          </Typography>

          <Typography fontSize={32} fontWeight="bold" color={colors.black}>
            {t("screens.welcome.title.remaining")}
          </Typography>
        </View>

        <Typography fontSize={14} fontWeight="regular" color={colors.gray} style={styles.subtitle}>
          {t("screens.welcome.subtitle")}
        </Typography>
        
        <Link href="/sign-in" asChild>
          <TouchableOpacity 
            style={{
              ...styles.startButton,
              ...(isConnected ? styles.startButtonEnabled : styles.startButtonDisabled),
            }}
            activeOpacity={0.7}
            disabled={!isConnected}
          >
            <Typography fontSize={16} fontWeight="bold" color={colors.white}>
              {t("screens.welcome.buttons.start")}
            </Typography>
          </TouchableOpacity>
        </Link>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  langContainer: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  langButton: {
    backgroundColor: colors.grayTint7,
    borderRadius: 15,
    borderCurve: "continuous",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  footer: {
    paddingBottom: Platform.OS === "ios" ? 45 : 25,
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    marginBottom: 15,
    textAlign: "center",
  },
  startButton: {
    height: 50,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderCurve: "continuous",
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonEnabled: {
    backgroundColor: colors.orange,
    opacity: 1,
  },
  startButtonDisabled: {
    backgroundColor: colors.grayTint5,
    opacity: 0.6,
  },  
});

export default WelcomeScreen;
