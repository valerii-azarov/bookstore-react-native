import React, { useEffect } from "react";
import { FlatList } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { 
  selectFavoriteBooks, 
  selectFetchFavoritesStatus, 
  selectFetchFavoritesResponse,
  selectLoadFavoriteBooks,
  selectToggleFavorite,
  selectResetFavorites,
} from "@/selectors/favoritesSelectors";
import { colors } from "@/constants/theme";

import ViewWrapper from "@/components/ViewWrapper";
import Loading from "@/components/Loading";
import FavoriteItem from "@/components/FavoriteItem";
import Empty from "@/components/Empty";
import ErrorNetwork from "@/components/ErrorNetwork";
import ErrorWithRetry from "@/components/ErrorWithRetry";

const FavoritesScreen = () => {
  const router = useRouter();

  const t = useTranslation();
  const isConnected = useIsConnected();

  const favoriteBooks = useFavoritesStore(selectFavoriteBooks);
  const status = useFavoritesStore(selectFetchFavoritesStatus);
  const response = useFavoritesStore(selectFetchFavoritesResponse);

  const fetchData = useFavoritesStore(selectLoadFavoriteBooks);
  const toggleFavorite = useFavoritesStore(selectToggleFavorite);
  const reset = useFavoritesStore(selectResetFavorites);

  const isLoading = status === "loading";
  const isEmpty = !isLoading && favoriteBooks.length === 0;
  const isError = !isLoading && response?.status === "error";

  useEffect(() => {
    if (isConnected) {
      fetchData();
    }

    return () => reset();
  }, [isConnected]);

  return (
    <ViewWrapper 
      title= {t("screens.favorites.header.title")} 
      onBackPress={() => router.back()}
    >
      {!isConnected && (
        <ErrorNetwork 
          message={t("common.messages.errorNetwork.title")}
          subMessage={t("common.messages.errorNetwork.subtitle")}
        />
      )}
      
      {isConnected && isLoading && (
        <Loading size="small" color={colors.orange} />
      )}

      {isConnected && isError && !isLoading && (   
        <ErrorWithRetry 
          message={t("common.messages.failedLoad.title")}
          subMessage={t("common.messages.failedLoad.subtitle")}
          hideButton
        />
      )}

      {isConnected && isEmpty && !isError && !isLoading && (
        <Empty 
          message={t("screens.favorites.messages.empty.title")} 
          hideSubMessage
        />
      )}

      {isConnected && !isLoading && !isEmpty && !isError && (
        <FlatList
          data={favoriteBooks}
          renderItem={({ item, index }) => (  
            <Animated.View
              key={`book-${item.id}`}
              entering={FadeInDown.delay(index * 75)}
            >
              <FavoriteItem
                item={item}
                onView={(bookId) => router.push(`/book/${bookId}`)}
                onAddToFavorites={(bookId) => toggleFavorite(bookId)}
                labels={{
                  favorite: t("components.favoriteBookItem.buttons.favorite"),
                }}
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

export default FavoritesScreen;
