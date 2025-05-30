import React, { useRef, useEffect } from "react";
import {
  View,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useBookStore } from "@/stores/bookStore";
import { useBooksStore } from "@/stores/booksStore";
import { selectDeleteBook } from "@/selectors/bookSelectors";
import {
  selectBooks,
  selectBooksStatus,
  selectBooksResponse,
  selectBooksHasMore,
  selectLoadBooks,
  selectLoadMoreBooks,
  selectRefreshBooks,
  selectResetAll,
} from "@/selectors/booksSelectors";
import { colors } from "@/constants/theme";

import ScreenWrapper from "@/components/ScreenWrapper";
import BookItem, { SwipeableRef} from "@/components/BookItem";
import Icon from "@/components/Icon";
import Loading from "@/components/Loading";
import ListLoader from "@/components/ListLoader";
import Empty from "@/components/Empty";
import ErrorNetwork from "@/components/ErrorNetwork";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import Typography from "@/components/Typography";
import FloatingButton from "@/components/FloatingButton";

const BooksAdminScreen = () => {
  const router = useRouter();

  const t = useTranslation();
  const isConnected = useIsConnected();

  const deleteBook = useBookStore(selectDeleteBook);

  const books = useBooksStore(selectBooks);
  const status = useBooksStore(selectBooksStatus);
  const response = useBooksStore(selectBooksResponse);
  const hasMore = useBooksStore(selectBooksHasMore);

  const fetchData = useBooksStore(selectLoadBooks);
  const loadMore = useBooksStore(selectLoadMoreBooks);
  const refresh = useBooksStore(selectRefreshBooks);
  const reset = useBooksStore(selectResetAll);

  const isLoading = status === "loading";
  const isFetching = status === "fetching";
  const isRefreshing = status === "refreshing"; 
  const isEmpty = !isLoading && books.length === 0;
  const isError = !isLoading && response?.status === "error";

  const swipeableRefs = useRef<Array<SwipeableRef | null>>([]);
  const openSwipeableRef = useRef<SwipeableRef | null>(null);
  const closeSwipeTimeout = useRef<NodeJS.Timeout | null>(null);

  const confirmDelete = (bookId: string, index: number) => {
    Alert.alert(
      t("screens.books.alerts.confirmDelete.title"),
      t("screens.books.alerts.confirmDelete.message"),
      [
        {
          text: t("screens.books.alerts.confirmDelete.buttons.cancel"),
          style: "cancel",
          onPress: () => {
            if (swipeableRefs.current[index]) {
              swipeableRefs.current[index]?.close();
            }
          },
        },
        {
          text: t("screens.books.alerts.confirmDelete.buttons.confirm"),
          style: "destructive",
          onPress: async () => {
            await deleteBook(bookId)
              .then(async () => {
                if (swipeableRefs.current[index]) {
                  swipeableRefs.current[index]?.close();
                }
                
                Alert.alert(
                  t("screens.books.alerts.confirmDelete.responses.success.title"),
                  t("screens.books.alerts.confirmDelete.responses.success.message"),
                  [{ text: "OK" }]
                );
              })
              .catch((error) => {
                Alert.alert(
                  t("screens.books.alerts.confirmDelete.responses.error.title"),
                  error.message || t("screens.books.alerts.confirmDelete.responses.error.message")
                );
              });
          },
        },
      ]
    );
  };
  
  const handleSwipeOpen = (index: number) => {
    const current = swipeableRefs.current[index];

    if (openSwipeableRef.current && openSwipeableRef.current !== current) {
      openSwipeableRef.current.close();
    }

    openSwipeableRef.current = current;

    if (closeSwipeTimeout.current) {
      clearTimeout(closeSwipeTimeout.current);
      closeSwipeTimeout.current = null;
    }

    closeSwipeTimeout.current = setTimeout(() => {
      openSwipeableRef.current?.close();
      openSwipeableRef.current = null;
      closeSwipeTimeout.current = null;
    }, 5000);
  };
  
  useEffect(() => {
    if (isConnected) {
      fetchData(true);
    }

    return () => reset();
  }, [isConnected]);
  
  return (
    <ScreenWrapper hideStatusBarBorder>
      <View 
        style={{
          backgroundColor: colors.white,
          borderBottomColor: colors.grayTint7,
          borderBottomWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <Typography 
          fontSize={24} 
          fontWeight="bold" 
          color={colors.black} 
          style={{ marginBottom: 5 }}
        >
          {t("screens.books.header.title.admin")}
        </Typography>

        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: isConnected ? colors.grayTint9 : colors.grayTint7,
            borderColor: colors.grayTint5,
            borderRadius: 16,
            borderWidth: 1,
            paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            if (isConnected) {
              router.push("/(admin)/books-search");
            }
          }}
          activeOpacity={0.7}
          disabled={!isConnected}
        >
          <Icon
            iconSet="Ionicons"
            iconName="search-outline"
            iconSize={24}
            iconColor={colors.grayTint3}
          />

          <Typography
            fontSize={14}
            fontWeight="medium"
            color={colors.grayTint3}
            style={{ marginLeft: 10 }}
          >
            {t("screens.books.searchInput.title")}
          </Typography>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
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
            message={t("common.messages.errorWithRetry.title")}
            subMessage={t("common.messages.errorWithRetry.subtitle")}
            buttonText={t("common.buttons.errorWithRetry")}
            onRetry={() => fetchData(true)}
          />
        )}

        {isConnected && isEmpty && !isError && !isLoading && (
          <Empty 
            message={t("screens.books.messages.empty.title")}
            subMessage={t("screens.books.messages.empty.subtitle")}
          />
        )}
        
        {isConnected && !isLoading && !isEmpty && !isError && (
          <FlatList
            data={books}
            renderItem={({ item, index }) => (
              <Animated.View
                key={`book-${item.id}`}
                entering={FadeInDown.delay(index * 75)}
              >
                <BookItem
                  ref={(ref) => {
                    if (ref) {
                      swipeableRefs.current[index] = ref;
                    }
                  }}
                  item={item}
                  isOwner
                  onView={(bookId) => router.push(`/book/${bookId}`)}
                  onEdit={(bookId) => router.push(`/(admin)/book-settings/${bookId}`)}
                  onDelete={(bookId) => confirmDelete(bookId, index)}
                  labels={{
                    available: t("components.bookItem.labels.availability.available"),
                    unavailable: t("components.bookItem.labels.availability.unavailable"),
                    article: t("components.bookItem.labels.article"),
                  }}
                  actionLabels={{
                    edit: t("components.bookItem.actions.edit"),
                    delete: t("components.bookItem.actions.delete"),
                  }}
                  onSwipeableOpen={() => handleSwipeOpen(index)}
                />
              </Animated.View>
            )}
            keyExtractor={(item) => item.id}
            numColumns={1}
            contentContainerStyle={{
              padding: 15,
              gap: 10,
            }}
            refreshing={isRefreshing}
            onRefresh={refresh}
            onEndReached={hasMore ? loadMore : undefined}
            onEndReachedThreshold={0.1}
            ListFooterComponent={isFetching ? <ListLoader /> : null}
          />
        )}
      </View>

      <FloatingButton
        onPress={() => router.push("/(admin)/(modals)/create-book")}
        icon={
          <Icon 
            iconSet="MaterialIcons"  
            iconName="add" 
            iconSize={28}
            iconColor={colors.white} 
          />
        }
      />
    </ScreenWrapper>
  );
};

export default BooksAdminScreen;
