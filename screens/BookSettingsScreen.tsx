import { useEffect } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { format } from "date-fns";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useBookStore } from "@/stores/bookStore";
import {
  selectCurrentBook,
  selectFetchBookStatus,
  selectFetchBookResponse,
  selectSetBookById,
  selectFetchBookById,
  selectResetCurrentBook,
} from "@/selectors/bookSelectors";
import { colors } from "@/constants/theme";

import ViewWrapper from "@/components/ViewWrapper";
import Loading from "@/components/Loading";
import ErrorNetwork from "@/components/ErrorNetwork";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import Typography from "@/components/Typography";

const BookSettingsScreen = () => {
  const router = useRouter();
  const { bookId } = useLocalSearchParams<{ bookId: string }>();   
    
  const t = useTranslation();
  const isConnected = useIsConnected();

  const currentBook = useBookStore(selectCurrentBook);
  const fetchBookStatus = useBookStore(selectFetchBookStatus);
  const fetchBookResponse = useBookStore(selectFetchBookResponse);
  
  const setBookById = useBookStore(selectSetBookById);
  const fetchBookById = useBookStore(selectFetchBookById);
  const resetCurrentBook = useBookStore(selectResetCurrentBook);

  const isLoading = fetchBookStatus === "loading";
  const isError = !isLoading && fetchBookResponse?.status === "error";

  const fields = [
    {
      key: "id",
      label: t("screens.bookSettings.fields.id"),
      value: currentBook?.id || "-",
      hasValue: true,
      isEditable: false,
    },
    {
      key: "title",
      label: t("screens.bookSettings.fields.title"),
      value: currentBook?.title || "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "authors",
      label: t("screens.bookSettings.fields.authors"),
      value: currentBook?.authors?.join(", ") || "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "rates",
      label: t("screens.bookSettings.fields.rates"),
      value: "-",
      hasValue: false,
      isEditable: true,
    },
    {
      key: "images",
      label: t("screens.bookSettings.fields.images"),
      value: "-",
      hasValue: false,
      isEditable: true,
    },
    {
      key: "backgroundColor",
      label: t("screens.bookSettings.fields.backgroundColor"),
      value: currentBook?.backgroundColor || "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "description",
      label: t("screens.bookSettings.fields.description"),
      value: currentBook?.description || "-",
      hasValue: false,
      isEditable: true,
    },
    {
      key: "genres",
      label: t("screens.bookSettings.fields.genres"),
      value: currentBook?.genres?.map(genre => t(`genres.${genre}`)).join(", ") || "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "language",
      label: t("screens.bookSettings.fields.language"),
      value: currentBook?.language ? t(`languages.${currentBook.language}`) : "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "publisher",
      label: t("screens.bookSettings.fields.publisher"),
      value: currentBook?.publisher || "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "publicationYear",
      label: t("screens.bookSettings.fields.publicationYear"),
      value: currentBook?.publicationYear?.toString() || "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "isbn",
      label: t("screens.bookSettings.fields.isbn"),
      value: currentBook?.isbn || "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "pageCount",
      label: t("screens.bookSettings.fields.pageCount"),
      value: currentBook?.pageCount?.toString() || "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "coverType",
      label: t("screens.bookSettings.fields.coverType"),
      value: currentBook?.coverType ? t(`coverTypes.${currentBook.coverType}`) : "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "bookType",
      label: t("screens.bookSettings.fields.bookType"),
      value: currentBook?.bookType ? t(`bookTypes.${currentBook.bookType}`) : "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "paperType",
      label: t("screens.bookSettings.fields.paperType"),
      value: currentBook?.coverType ? t(`paperTypes.${currentBook.paperType}`) : "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "size",
      label: t("screens.bookSettings.fields.size"),
      value: currentBook?.size || "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "weight",
      label: t("screens.bookSettings.fields.weight"),
      value: currentBook?.weight?.toString() || "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "illustrations",
      label: t("screens.bookSettings.fields.illustrations"),
      value: t(`screens.bookSettings.values.illustrations.${currentBook?.illustrations ? "contains" : "notContains"}`),
      hasValue: true,
      isEditable: true,
    },
    {
      key: "availableQuantity",
      label: t("screens.bookSettings.fields.availableQuantity"),
      value: currentBook?.availableQuantity?.toString() || "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "sku",
      label: t("screens.bookSettings.fields.sku"),
      value: currentBook?.sku || "-",
      hasValue: true,
      isEditable: true,
    },
    {
      key: "createdAt",
      label: t("screens.bookSettings.fields.createdAt"),
      value: currentBook?.createdAt ? format(new Date(currentBook.createdAt), "dd.MM.yyyy HH:mm") : "-",
      hasValue: true,
      isEditable: false,
    },
    {
      key: "updatedAt",
      label: t("screens.bookSettings.fields.updatedAt"),
      value: currentBook?.updatedAt ? format(new Date(currentBook.updatedAt), "dd.MM.yyyy HH:mm") : "-",
      hasValue: true,
      isEditable: false,
    },
  ];

  useEffect(() => {
    if (bookId && isConnected) {
      setBookById(bookId);
      fetchBookById();
    }
    return () => resetCurrentBook();
  }, [bookId, isConnected]);

  return (
    <ViewWrapper 
      title={t("screens.bookSettings.header")} 
      onBackPress={() => router.back()}
      hideFooter
    >
      {!isConnected && (
        <ErrorNetwork 
          message={t("components.errorNetwork.title")}
          subMessage={t("components.errorNetwork.subtitle")}
        />
      )}

      {isConnected && isLoading && (
        <Loading size="small" color={colors.orange} />
      )}

      {isConnected && isError && !isLoading && (
        <ErrorWithRetry 
          message={t("screens.bookSettings.messages.error.text")}
          subMessage={t("screens.bookSettings.messages.error.subText")}
          hideButton 
        />
      )}

      {isConnected && !isLoading && !isError && currentBook !== null && (
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.content, styles.padded]}>
            {fields.map((field, index) => (
              <View
                key={index}
                style={{
                  marginBottom: index === fields.length - 1 ? 0 : 15,
                }}
              >
                <View
                  style={{
                    flexDirection: field.hasValue ? "column" : "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    fontSize={field.hasValue ? 14 : 16}
                    fontWeight={field.hasValue ? "medium" : "bold"}
                    color={field.hasValue ? colors.gray : colors.black}
                    numberOfLines={1}
                    style={{ 
                      marginBottom: field.hasValue ? 2.5 : 0,
                    }}
                  >
                    {field.label}
                  </Typography>

                  <View style={styles.parameterRow}>
                    {field.hasValue && (
                      <Typography
                        fontSize={16}
                        fontWeight="bold"
                        color={colors.black}
                        numberOfLines={1}
                        style={{ 
                          flexShrink: 1, 
                          marginRight: 15, 
                        }}
                      >
                        {field.value}
                      </Typography>
                    )}

                    {field.isEditable && (
                      <TouchableOpacity
                        onPress={() => {
                          if (isConnected) {
                            router.push({
                              pathname: "/edit-book/[field]",
                              params: { field: field.key },
                            });
                          }
                        }}
                        disabled={!isConnected}
                      >
                        <Typography
                          fontSize={16}
                          fontWeight="bold"
                          color={colors.black}
                          numberOfLines={1}
                          style={{ 
                            flexShrink: 1,
                            textDecorationLine: "underline",
                          }}
                        >
                          {t('screens.bookSettings.buttons.edit')}
                        </Typography>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  parameterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  padded: {
    padding: 15,
  }, 
});

export default BookSettingsScreen;
