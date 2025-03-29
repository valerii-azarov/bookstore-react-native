import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useTranslation } from "@/contexts/translateContext";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { 
  selectFavoriteBooks, 
  selectFavoriteStatus, 
  selectFavoriteResponse,
  selectLoadFavoriteBooks,
  selectToggleFavorite,
  selectResetFavorites,
} from "@/selectors/favoritesSelectors";
import { colors } from "@/constants/theme";

import ListViewWrapper from "@/components/ListViewWrapper";
import Loading from "@/components/Loading";
import FavoriteBookItem from "@/components/FavoriteBookItem";
import Typography from "@/components/Typography";

const FavoritesScreen = () => {
  const router = useRouter();

  const t = useTranslation();

  const favoriteBooks = useFavoritesStore(selectFavoriteBooks);
  const favoriteStatus = useFavoritesStore(selectFavoriteStatus);
  const favoriteResponse = useFavoritesStore(selectFavoriteResponse);

  const loadFavoriteBooks = useFavoritesStore(selectLoadFavoriteBooks);
  const toggleFavorite = useFavoritesStore(selectToggleFavorite);
  const resetFavorites = useFavoritesStore(selectResetFavorites);

  const isLoading = favoriteStatus === "loading";
  const isEmpty = !isLoading && favoriteBooks.length === 0;
  const isError = !isLoading && favoriteResponse?.status === "error";

  useEffect(() => {
    loadFavoriteBooks();
    return () => resetFavorites();
  }, []);

  return (
    <ListViewWrapper 
      title= {t("screens.favorites.header.text")} 
      onBackPress={() => router.back()}
    >
      {isLoading && <Loading size="small" color={colors.orange} />}

      {!isLoading && isEmpty && (
        <View style={styles.overlayContainer}>
          <Typography fontSize={16} fontWeight="medium">
            {t("screens.favorites.messages.empty.text")}
          </Typography>
        </View>
      )}

      {!isLoading && isError && (
        <View style={styles.overlayContainer}>
          <Icon name="alert-circle-outline" size={32} color={colors.red} style={styles.errorIcon} />
          <Typography fontSize={18} fontWeight="medium" color={colors.red}>
            {favoriteResponse?.message || t("screens.favorites.messages.error.subText")}
          </Typography>
        </View>
      )}

      {!isLoading && !isEmpty && !isError && (
        <FlatList
          data={favoriteBooks}
          renderItem={({ item, index }) => (  
            <Animated.View
              entering={FadeInDown.delay(index * 75)}
            >
              <FavoriteBookItem
                item={item}
                onViewDetails={() => router.push(`/(user)/book/${item.id}`)}
                onToggleFavorite={() => toggleFavorite(item.id)}
              />
            </Animated.View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={1}
          contentContainerStyle={{
            padding: 15,
            gap: 10,
          }}
        />
      )}
    </ListViewWrapper>
  );
};

const styles = StyleSheet.create({
  errorIcon: {
    marginBottom: 5,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default FavoritesScreen;
