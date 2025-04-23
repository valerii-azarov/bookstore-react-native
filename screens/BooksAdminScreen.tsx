import { useCallback, useEffect } from "react";
import { View, Alert, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
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
} from "@/selectors/booksSelectors";
import { colors } from "@/constants/theme";
import { DEFAULT_BOOKS_LIMIT } from "@/constants/settings";
import { BaseBook } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import BookItem from "@/components/BookItem";
import SkeletonBookItem from "@/components/SkeletonBookItem";
import Icon from "@/components/Icon";
import ListLoader from "@/components/ListLoader";
import Empty from "@/components/Empty";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import Typography from "@/components/Typography";
import FloatingActionButton from "@/components/FloatingButton";

const BooksAdminScreen = () => {
  const router = useRouter();

  const t = useTranslation();

  const deleteBook = useBookStore(selectDeleteBook);

  const books = useBooksStore(selectBooks);
  const booksStatus = useBooksStore(selectBooksStatus);
  const booksResponse = useBooksStore(selectBooksResponse);
  const booksHasMore = useBooksStore(selectBooksHasMore);

  const loadBooks = useBooksStore(selectLoadBooks);
  const loadMoreBooks = useBooksStore(selectLoadMoreBooks);
  const refreshBooks = useBooksStore(selectRefreshBooks);

  const isLoading = booksStatus === "loading";
  const isFetching = booksStatus === "fetching";
  const isRefreshing = booksStatus === "refreshing"; 
  const isEmpty = !isLoading && books.length === 0;
  const isError = !isLoading && booksResponse?.status === "error";

  const confirmDeleteBook = (bookId: string) => {
    Alert.alert(
      t("alerts.confirmDeleteBook.title"),
      t("alerts.confirmDeleteBook.message"),
      [
        {
          text: t("alerts.static.cancel"),
          style: "cancel",
        },
        {
          text: t("alerts.confirmDeleteBook.confirm"),
          style: "destructive",
          onPress: async () => {
            await deleteBook(bookId)
              .then(() => {
                Alert.alert(
                  t("alerts.confirmDeleteBook.success.title"),
                  t("alerts.confirmDeleteBook.success.message"),
                  [{ text: "OK" }]
                );
              })
              .catch((error) => {
                Alert.alert(
                  t("alerts.static.error.title"),
                  error.message || t("alerts.confirmDeleteBook.error.message")
                );
              });
          },
        },
      ]
    );
  };

  const renderItem = useCallback(({ item }: { item: BaseBook }) => {
    if (isLoading || !item) {
      return <SkeletonBookItem isOwner />;
    }
    return (
      <BookItem
        item={item}
        isOwner
        onView={() => router.push(`/book/${item.id}`)}
        onEdit={(bookId) => {
          // this needs to add a screen edit book in future
          console.log(`redirect to /edit-book/${bookId}`);
        }}
        onDelete={(bookId) => confirmDeleteBook(bookId)}
      />
    );
  }, [isLoading, router]);

  const renderFooter = useCallback(() => {
    if (isFetching) {
      return <ListLoader />;
    }
    return null;
  }, [isFetching]);
  
  useEffect(() => {
    loadBooks(true);
  }, []);
  
  return (
    <ScreenWrapper hideStatusBarBorder>
      <View style={styles.header}>
        <Typography 
          fontSize={24} 
          fontWeight="bold" 
          color={colors.black} 
          style={{ marginBottom: 5 }}
        >
          {t("screens.books.headers.titleAdmin")}
        </Typography>

        <TouchableOpacity
          style={styles.searchInput}
          onPress={() => router.push("/(admin)/books-search")}
          activeOpacity={0.7}
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
            {t(`screens.books.placeholders.titleAndSku.text`)}
          </Typography>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {isError && !isLoading && (
          <ErrorWithRetry
            message={t("screens.books.messages.error.text")}
            subMessage={t("screens.books.messages.error.subText")}
            buttonText={t("screens.books.buttons.error.text")}
            containerStyle={styles.padded}
            onRetry={() => loadBooks(true)}
          />
        )}

        {isEmpty && !isError && !isLoading && (
          <Empty 
            message={t("screens.books.messages.empty.text")}
            subMessage={t("screens.books.messages.empty.subText")}
            containerStyle={styles.padded}
          />
        )}
        
        {!isEmpty && !isError && (
          <FlatList
            data={isLoading ? Array(DEFAULT_BOOKS_LIMIT) : books}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              isLoading ? `skeleton-${index}` : (item?.id || `item-${index}`)
            }
            numColumns={1}
            contentContainerStyle={{
              padding: 15,
              gap: 10,
            }}
            refreshing={isRefreshing}
            onRefresh={refreshBooks}
            onEndReached={booksHasMore ? loadMoreBooks : undefined}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
          />
        )}
      </View>

      <FloatingActionButton
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    borderBottomColor: colors.grayTint7,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchInput: {
    height: 50,
    backgroundColor: colors.grayTint9,
    borderColor: colors.grayTint5,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  clearButton: {
    backgroundColor: colors.grayTint8,
    borderRadius: 12,
    padding: 4,
  },
  padded: {
    padding: 15,
  },
});

export default BooksAdminScreen;
