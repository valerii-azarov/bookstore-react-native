import { useEffect } from "react";
import { FlatList } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
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
import ErrorNetwork from "@/components/ErrorNetwork";
import ErrorWithRetry from "@/components/ErrorWithRetry";

const FavoritesScreen = () => {
  const router = useRouter();

  const t = useTranslation();
  const isConnected = useIsConnected();

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
    if (isConnected) {
      loadFavoriteBooks();
    }
    return () => resetFavorites();
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
              entering={FadeInDown.delay(index * 100)}
            >
              <FavoriteItem
                item={item}
                onViewDetails={() => {
                  if (isConnected) {
                    router.push(`/book/${item.id}`);
                  }
                }}
                onToggleFavorite={() => toggleFavorite(item.id)}
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
