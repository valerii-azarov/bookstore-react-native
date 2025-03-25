import React, { useEffect } from "react";
import { View, FlatList, Image, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { 
  selectFavoriteBooks, 
  selectFavoriteStatus, 
  selectFavoriteResponse,
  selectLoadFavoriteBooks,
} from "@/selectors/favoritesSelectors";
import { colors } from "@/constants/theme";
import { BaseBook } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Typography from "@/components/Typography";

const FavoritesScreen = () => {
  const insets = useSafeAreaInsets();

  const favoriteBooks = useFavoritesStore(selectFavoriteBooks);
  const favoriteStatus = useFavoritesStore(selectFavoriteStatus);
  const favoriteResponse = useFavoritesStore(selectFavoriteResponse);

  const loadFavoriteBooks = useFavoritesStore(selectLoadFavoriteBooks);

  const isLoading = favoriteStatus === "loading";
  const isEmpty = !isLoading && favoriteBooks.length === 0;
  const isError = !isLoading && favoriteResponse?.status === "error";

  const renderItem = ({ item }: { item: BaseBook | undefined }) => {
    return (
      <View 
        style={{
          backgroundColor: colors.white,
          padding: 15,
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <View style={{ marginRight: 10 }}>
          <Image
            style={{
              width: 48,
              height: 75,
            }}
            source={{ uri: item?.coverImage }}
            resizeMode="cover"
          />
        </View>
        
        <View style={{ flex: 1 }}>
          <Typography fontSize={12} fontWeight="bold" color={colors.gray} numberOfLines={1}>
            {item?.authors.join(", ")}
          </Typography>

          <Typography fontSize={16} fontWeight="bold" numberOfLines={1}>
            {item?.title}
          </Typography>
        </View>
      </View>
    );
  };

  useEffect(() => {
    loadFavoriteBooks();
  }, [loadFavoriteBooks]);

  return (
    <ScreenWrapper statusBarStyle="dark" disableTopInset>
      <Header
        title="Favorites"
        iconLeft={<BackButton />}
        style={[
          styles.headerContainer, 
          {
            backgroundColor: colors.white,
            borderBottomColor: colors.grayTint7,
            borderBottomWidth: 1,
            paddingTop: Platform.OS === "ios" ? insets.top : 15 + insets.top,
            paddingBottom: 10,
          },
        ]}
      />

      <View style={styles.contentContainer}>
        {!isEmpty && !isError && (
          <FlatList
            data={favoriteBooks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
            key="list"
            contentContainerStyle={{
              paddingVertical: 10,
              paddingHorizontal: 15,
              gap: 10,
            }}
          />
        )}

        {isEmpty && (
          <View style={styles.overlayContainer}>
            <Typography fontSize={16} fontWeight="medium">
              No favorites available
            </Typography>
          </View>
        )}

        {isError && (
          <View style={styles.overlayContainer}>
            <Typography fontSize={16} fontWeight="medium" color={colors.red}>
              {favoriteResponse?.message}
            </Typography>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default FavoritesScreen;
