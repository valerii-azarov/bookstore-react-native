import React, { useEffect } from "react";
import {
  View,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { useCartStore } from "@/stores/cartStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import {
  selectCategories,
  selectCategoriesStatus,
  selectCategoriesResponse,
  selectLoadCategories,
  selectRefreshCategories,
} from "@/selectors/categoriesSelectors";
import {
  selectToggleCart,
  selectGetCartCount,
} from "@/selectors/cartSelectors";
import { selectToggleFavorite } from "@/selectors/favoritesSelectors";
import { colors } from "@/constants/theme";

import ScreenWrapper from "@/components/ScreenWrapper";
import CategoryBookItem from "@/components/CategoryBookItem";
import SkeletonCategories from "@/components/SkeletonCategories";
import Header from "@/components/Header";
import IconBadge from "@/components/IconBadge";
import Empty from "@/components/Empty";
import ErrorNetwork from "@/components/ErrorNetwork";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import RedirectButton from "@/components/RedirectButton";
import Typography from "@/components/Typography";

const BooksUserScreen = () => {
  const router = useRouter();

  const t = useTranslation();
  const isConnected = useIsConnected();

  const categories = useCategoriesStore(selectCategories);
  const status = useCategoriesStore(selectCategoriesStatus);
  const response = useCategoriesStore(selectCategoriesResponse);

  const fetchData = useCategoriesStore(selectLoadCategories);
  const refresh = useCategoriesStore(selectRefreshCategories);

  const cartCount = useCartStore(selectGetCartCount)()
  
  const toggleCart = useCartStore(selectToggleCart);
  const toggleFavorite = useFavoritesStore(selectToggleFavorite);

  const isLoading = status === "loading";
  const isRefreshing = status === "refreshing";
  const isEmpty = !isLoading && Object.keys(categories).length === 0;
  const isError = !isLoading && response?.status === "error";

  useEffect(() => {
    if (isConnected) {
      fetchData();
    }
  }, [isConnected]);

  return (
    <ScreenWrapper hideStatusBarBorder>
      <Header
        title={t("screens.books.header.title.user")}
        titleSize={18}
        iconRight={
          <IconBadge
            badgeCount={cartCount}
            badgeIconSet="MaterialIcons"
            badgeIconName="shopping-cart"
            onPress={() => router.push("/(user)/(modals)/cart")}
          />
        }
        style={{ 
          minHeight: 40,
          backgroundColor: colors.white,
          borderBottomColor: colors.grayTint7,
          borderBottomWidth: 1,
          paddingHorizontal: 15,
        }}
      />
      
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          isConnected ? (
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refresh}
            />
          ) : undefined
        }
        scrollEnabled={isConnected && !isEmpty && !isError && !isRefreshing}
      >
        {!isConnected && (
          <ErrorNetwork 
            message={t("common.messages.errorNetwork.title")}
            subMessage={t("common.messages.errorNetwork.subtitle")}
          />
        )}
        
        {isConnected && isLoading && <SkeletonCategories />}

        {isConnected && isError && !isLoading && (
          <ErrorWithRetry 
            message={t("common.messages.errorWithRetry.title")}
            subMessage={t("common.messages.errorWithRetry.subtitle")}
            buttonText={t("common.buttons.errorWithRetry")}
            onRetry={() => fetchData()}
          />
        )}

        {isConnected && isEmpty && !isError && !isLoading && (
          <Empty 
            message={t("screens.books.messages.empty.title")}
            subMessage={t("screens.books.messages.empty.subtitle")} 
          />
        )}

        {isConnected && !isLoading && !isEmpty && !isError && (
          Object.keys(categories).map((category, index) => (
            <View key={index} style={{ marginTop: 15 }}>
              <View 
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 15,
                }}
              >
                <Typography fontSize={18} fontWeight="bold" color={colors.black}>
                  {t(`common.genres.${category}`)}
                </Typography>

                <RedirectButton
                  title={t("screens.books.buttons.showAll")}
                  onPress={() =>
                    router.push({
                      pathname: "/category-books/[category]",
                      params: { category },
                    })
                  }
                />
              </View>

              <FlatList
                data={categories[category]}
                renderItem={({ item }) => (
                  <CategoryBookItem
                    item={item}
                    mode="horizontal"
                    onView={(bookId) => router.push(`/(user)/book/${bookId}`)}
                    onAddToFavorites={(bookId) => toggleFavorite(bookId)}
                    onAddToCart={(item) => toggleCart(item)}
                    labels={{
                      details: t("components.bookItem.buttons.details"),
                    }}
                  />
                )}
                keyExtractor={(item) => item.id}
                horizontal
                contentContainerStyle={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  gap: 15,
                }}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ))
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default BooksUserScreen;
