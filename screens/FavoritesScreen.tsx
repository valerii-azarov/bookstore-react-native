import { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
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

import ViewWrapper from "@/components/ViewWrapper";
import Loading from "@/components/Loading";
import FavoriteItem from "@/components/FavoriteItem";
import Empty from "@/components/Empty";
import ErrorWithRetry from "@/components/ErrorWithRetry";

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
    <ViewWrapper 
      title= {t("screens.favorites.header.text")} 
      onBackPress={() => router.back()}
    >
      {isLoading && <Loading size="small" color={colors.orange} />}

      {isError && !isLoading && (
        <View style={styles.overlayContainer}>
          <ErrorWithRetry 
            message={t("screens.favorites.messages.error.text")}
            subMessage={t("screens.favorites.messages.error.subText")}
            hideButton
          />
        </View>
      )}

      {isEmpty && !isError && !isLoading && (
        <View style={styles.overlayContainer}>
          <Empty 
            message={t("screens.favorites.messages.empty.text")} 
            hideSubMessage
          />
        </View>
      )}

      {!isLoading && !isEmpty && !isError && (
        <FlatList
          data={favoriteBooks}
          renderItem={({ item, index }) => (  
            <Animated.View
              entering={FadeInDown.delay(index * 100)}
            >
              <FavoriteItem
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
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default FavoritesScreen;
