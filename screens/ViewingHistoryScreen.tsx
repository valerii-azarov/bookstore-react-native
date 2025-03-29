import React, { useEffect } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { enUS, uk } from "date-fns/locale";
import { View, ScrollView, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useLanguage, useTranslation } from "@/contexts/translateContext";
import { useViewingHistoryStore } from "@/stores/viewingHistoryStore";
import {
  selectViewingHistoryByDate,
  selectViewingHistoryStatus,
  selectViewingHistoryResponse,
  selectLoadViewingHistory,
  selectResetViewingHistory,
} from "@/selectors/viewingHistorySelectors";
import { colors } from "@/constants/theme";

import ListViewWrapper from "@/components/ListViewWrapper";
import Loading from "@/components/Loading";
import ViewingHistoryBookItem from "@/components/ViewingHistoryBookItem";
import Typography from "@/components/Typography";

const ViewingHistoryScreen = () => {
  const router = useRouter();

  const language = useLanguage();
  const t = useTranslation();

  const viewingHistoryByDate = useViewingHistoryStore(selectViewingHistoryByDate);
  const viewingHistoryStatus = useViewingHistoryStore(selectViewingHistoryStatus);
  const viewingHistoryResponse = useViewingHistoryStore(selectViewingHistoryResponse);

  const loadViewingHistory = useViewingHistoryStore(selectLoadViewingHistory);
  const resetViewingHistory = useViewingHistoryStore(selectResetViewingHistory);

  const isLoading = viewingHistoryStatus === "loading";
  const isEmpty = !isLoading && viewingHistoryByDate.length === 0;
  const isError = !isLoading && viewingHistoryResponse?.status === "error";

  const transformToDateString = (date: string) => {
    const diffDays = differenceInCalendarDays(new Date(), new Date(date));
    const dateKey = [0, 1, 2].includes(diffDays) ? ["today", "yesterday", "dayBeforeYesterday"][diffDays] : "";
    
    return dateKey ? t(`date.${dateKey}`) : format(new Date(date), "d MMMM yyyy", { 
      locale: language === "en" ? enUS : uk 
    });
  };

  useEffect(() => {
    loadViewingHistory();
    return () => resetViewingHistory();
  }, []);

  return (
    <ListViewWrapper 
      title= {t("screens.viewingHistory.header.text")} 
      onBackPress={() => router.back()}
    >      
      {isLoading && <Loading size="small" color={colors.orange} />}
      
      {!isLoading && isEmpty && (
        <View style={styles.overlayContainer}>
          <Typography fontSize={16} fontWeight="medium">
            {t("screens.viewingHistory.messages.empty.text")}
          </Typography>
        </View>
      )}

      {!isLoading && isError && (
        <View style={styles.overlayContainer}>
          <Icon name="alert-circle-outline" size={32} color={colors.red} style={styles.errorIcon} />

          <Typography fontSize={18} fontWeight="medium" color={colors.red}>
            {viewingHistoryResponse?.message || t("screens.viewingHistory.messages.error.subText")}
          </Typography>
        </View>
      )}

      {!isLoading && !isEmpty && !isError && (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {viewingHistoryByDate.map((day, index) => (
            <Animated.View 
              key={index}
              entering={FadeInDown.delay(index * 100)}
              style={{ 
                marginBottom: index === viewingHistoryByDate.length - 1 ? 0 : 15 
              }}
            >
              <Typography fontSize={16} fontWeight="bold" style={styles.title}>
                {transformToDateString(day.date)}
              </Typography>
              
              <View style={styles.booksContainer}>  
                {day.books.map((book, index) => (
                  <ViewingHistoryBookItem
                    key={index}
                    item={book}
                    onViewDetails={() => router.push(`/(user)/book/${book.id}`)}
                  />
                ))}
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      )}
    </ListViewWrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    padding: 15,
  },
  title: {
    marginBottom: 5,
  },
  errorIcon: {
    marginBottom: 5,
  },
  booksContainer: {
    gap: 5,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default ViewingHistoryScreen;
