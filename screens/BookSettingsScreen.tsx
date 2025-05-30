import React, { useEffect } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
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

interface ParameterItem {
  key: string;
  label: string;
  value?: string;
  isEditable: boolean;
}

const BookSettingsScreen = () => {
  const router = useRouter();
  const { bookId } = useLocalSearchParams<{ bookId: string }>();   
    
  const t = useTranslation();
  const isConnected = useIsConnected();

  const currentBook = useBookStore(selectCurrentBook);
  const status = useBookStore(selectFetchBookStatus);
  const response = useBookStore(selectFetchBookResponse);
  
  const setBookById = useBookStore(selectSetBookById);
  const fetchData = useBookStore(selectFetchBookById);
  const reset = useBookStore(selectResetCurrentBook);

  const isLoading = status === "loading";
  const isError = !isLoading && response?.status === "error";

  const items: ParameterItem[] = [
    {
      key: "id",
      label: t("common.parameters.id.label"),
      value: currentBook?.id || "-",
      isEditable: false,
    },
    {
      key: "title",
      label: t("common.parameters.title.label"),
      value: currentBook?.title || "-",
      isEditable: true,
    },
    {
      key: "authors",
      label: t("common.parameters.authors.label"),
      value: currentBook?.authors?.join(", ") || "-",
      isEditable: true,
    },
    {
      key: "rates",
      label: t("common.parameters.rates.label"),
      isEditable: true,
    },
    {
      key: "images",
      label: t("common.parameters.images.label"),
      isEditable: true,
    },
    {
      key: "backgroundColor",
      label: t("common.parameters.backgroundColor.label"),
      value: currentBook?.backgroundColor || "-",
      isEditable: true,
    },
    {
      key: "description",
      label: t("common.parameters.description.label"),
      isEditable: true,
    },
    {
      key: "genres",
      label: t("common.parameters.genres.label"),
      value: currentBook?.genres?.map(genre => t(`common.genres.${genre}`)).join(", ") || "-",
      isEditable: true,
    },
    {
      key: "language",
      label: t("common.parameters.language.label"),
      value: currentBook?.language ? t(`common.languages.${currentBook.language}`) : "-",
      isEditable: true,
    },
    {
      key: "publisher",
      label: t("common.parameters.publisher.label"),
      value: currentBook?.publisher || "-",
      isEditable: true,
    },
    {
      key: "publicationYear",
      label: t("common.parameters.publicationYear.label"),
      value: currentBook?.publicationYear?.toString() || "-",
      isEditable: true,
    },
    {
      key: "isbn",
      label: t("common.parameters.isbn.label"),
      value: currentBook?.isbn || "-",
      isEditable: true,
    },
    {
      key: "pageCount",
      label: t("common.parameters.pageCount.label"),
      value: currentBook?.pageCount?.toString() || "-",
      isEditable: true,
    },
    {
      key: "coverType",
      label: t("common.parameters.coverType.label"),
      value: currentBook?.coverType ? t(`common.coverTypes.${currentBook.coverType}`) : "-",
      isEditable: true,
    },
    {
      key: "bookType",
      label: t("common.parameters.bookType.label"),
      value: currentBook?.bookType ? t(`common.bookTypes.${currentBook.bookType}`) : "-",
      isEditable: true,
    },
    {
      key: "paperType",
      label: t("common.parameters.paperType.label"),
      value: currentBook?.coverType ? t(`common.paperTypes.${currentBook.paperType}`) : "-",
      isEditable: true,
    },
    {
      key: "size",
      label: t("common.parameters.size.label"),
      value: currentBook?.size || "-",
      isEditable: true,
    },
    {
      key: "weight",
      label: t("common.parameters.weight.label"),
      value: currentBook?.weight?.toString() || "-",
      isEditable: true,
    },
    {
      key: "illustrations",
      label: t("common.parameters.illustrations.label"),
      value: t(`common.parameters.illustrations.values.${currentBook?.illustrations ? "contains" : "notContains"}`),
      isEditable: true,
    },
    {
      key: "availableQuantity",
      label: t("common.parameters.availableQuantity.label"),
      value: currentBook?.availableQuantity?.toString() || "-",
      isEditable: true,
    },
    {
      key: "sku",
      label: t("common.parameters.sku.label"),
      value: currentBook?.sku || "-",
      isEditable: true,
    },
    {
      key: "createdAt",
      label: t("common.parameters.createdAt.label"),
      value: currentBook?.createdAt ? format(new Date(currentBook.createdAt), "dd.MM.yyyy HH:mm") : "-",
      isEditable: false,
    },
    {
      key: "updatedAt",
      label: t("common.parameters.updatedAt.label"),
      value: currentBook?.updatedAt ? format(new Date(currentBook.updatedAt), "dd.MM.yyyy HH:mm") : "-",
      isEditable: false,
    },
  ];

  useEffect(() => {
    const shouldFetch = bookId && isConnected;
    if (shouldFetch) {
      setBookById(bookId);
      fetchData();
    }
    
    return () => reset();
  }, [bookId, isConnected]);

  return (
    <ViewWrapper 
      title={t("screens.bookSettings.header.title")} 
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
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, padding: 15 }}>
            {items.map((item, index) => (
              <View
                key={index}
                style={{
                  marginBottom: index === items.length - 1 ? 0 : 15,
                }}
              >
                <View
                  style={{
                    flexDirection: item.value ? "column" : "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    fontSize={item.value ? 14 : 16}
                    fontWeight={item.value ? "medium" : "bold"}
                    color={item.value ? colors.gray : colors.black}
                    numberOfLines={1}
                    style={{ 
                      marginBottom: item.value ? 2.5 : 0,
                    }}
                  >
                    {item.label}
                  </Typography>

                  <View 
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {item.value && (
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
                        {item.value}
                      </Typography>
                    )}

                    {item.isEditable && (
                      <TouchableOpacity
                        onPress={() => {
                          if (isConnected) {
                            router.push({
                              pathname: "/(admin)/(modals)/edit-book/[field]",
                              params: { field: item.key },
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

export default BookSettingsScreen;
