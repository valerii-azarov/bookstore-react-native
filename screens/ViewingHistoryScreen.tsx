import { useEffect } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { enUS, uk } from "date-fns/locale";
import { View, ScrollView, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useLanguage, useTranslation } from "@/contexts/translateContext";
import { useViewingHistoryStore } from "@/stores/viewingHistoryStore";
import {
  selectViewingHistory,
  selectViewingHistoryStatus,
  selectViewingHistoryResponse,
  selectLoadViewingHistory,
  selectResetViewingHistory,
} from "@/selectors/viewingHistorySelectors";
import { colors } from "@/constants/theme";

import ListViewWrapper from "@/components/ListViewWrapper";
import Loading from "@/components/Loading";
import ViewingHistoryBookItem from "@/components/ViewingHistoryBookItem";
import Empty from "@/components/Empty";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import Typography from "@/components/Typography";

const ViewingHistoryScreen = () => {
  const router = useRouter();

  const language = useLanguage();
  const t = useTranslation();

  const viewingHistory = useViewingHistoryStore(selectViewingHistory);
  const viewingHistoryStatus = useViewingHistoryStore(selectViewingHistoryStatus);
  const viewingHistoryResponse = useViewingHistoryStore(selectViewingHistoryResponse);

  const loadViewingHistory = useViewingHistoryStore(selectLoadViewingHistory);
  const resetViewingHistory = useViewingHistoryStore(selectResetViewingHistory);

  const isLoading = viewingHistoryStatus === "loading";
  const isEmpty = !isLoading && viewingHistory.length === 0;
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
      
      {isError && !isLoading && (
        <View style={styles.overlayContainer}>
          <ErrorWithRetry 
            message={t("screens.viewingHistory.messages.error.text")}
            subMessage={t("screens.viewingHistory.messages.error.subText")}
            hideButton
          />
        </View>
      )}

      {isEmpty && !isError && !isLoading && (
        <View style={styles.overlayContainer}>
          <Empty 
            message={t("screens.viewingHistory.messages.empty.text")} 
            hideSubMessage
          />
        </View>
      )}

      {!isLoading && !isEmpty && !isError && (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {viewingHistory.map((history, index) => (
            <Animated.View 
              key={index}
              entering={FadeInDown.delay(index * 100)}
              style={{ 
                marginBottom: index === viewingHistory.length - 1 ? 0 : 15 
              }}
            >
              <Typography fontSize={16} fontWeight="bold" style={{ marginBottom: 5 }}>
                {transformToDateString(history.date)}
              </Typography>
              
              <View style={styles.historyList}>  
                {history.books.map((book, index) => (
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
  historyList: {
    gap: 10,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default ViewingHistoryScreen;
