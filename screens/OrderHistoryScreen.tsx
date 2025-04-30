import { useEffect, useCallback } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { enUS, uk } from "date-fns/locale";
import { View, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useIsConnected } from "@/contexts/networkContext";
import { useLanguage, useTranslation } from "@/contexts/translateContext";
import { useOrderHistoryStore } from "@/stores/orderHistoryStore";
import {
  selectOrderHistory,
  selectOrderHistoryStatus,
  selectOrderHistoryResponse,
  selectOrderHistoryHasMore,
  selectLoadOrderHistory,
  selectLoadMoreOrderHistory,
  selectRefreshOrderHistory,
  selectResetOrderHistory,
} from "@/selectors/orderHistorySelectors";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";
import { OrderHistoryByDate } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import SkeletonOrderHistoryList from "@/components/SkeletonOrderHistoryList";
import Header from "@/components/Header";
import ListLoader from "@/components/ListLoader";
import OrderHistoryItem from "@/components/OrderHistoryItem";
import Empty from "@/components/Empty";
import ErrorNetwork from "@/components/ErrorNetwork";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import Typography from "@/components/Typography";

const OrderHistoryScreen = () => {
  const router = useRouter();

  const t = useTranslation();
  const language = useLanguage();
  const isConnected = useIsConnected();
  
  const orderHistory = useOrderHistoryStore(selectOrderHistory);
  const orderHistoryStatus = useOrderHistoryStore(selectOrderHistoryStatus);
  const orderHistoryResponse = useOrderHistoryStore(selectOrderHistoryResponse);
  const orderHistoryHasMore = useOrderHistoryStore(selectOrderHistoryHasMore);
  
  const loadOrderHistory = useOrderHistoryStore(selectLoadOrderHistory);
  const loadMoreOrderHistory = useOrderHistoryStore(selectLoadMoreOrderHistory);
  const refreshOrderHistory = useOrderHistoryStore(selectRefreshOrderHistory);
  const resetOrderHistory = useOrderHistoryStore(selectResetOrderHistory);

  const isLoading = orderHistoryStatus === "loading";
  const isFetching = orderHistoryStatus === "fetching";
  const isRefreshing = orderHistoryStatus === "refreshing";
  const isEmpty = !isLoading && orderHistory.length === 0;
  const isError = orderHistoryResponse?.status === "error";

  const transformToDateString = (date: string) => {
    const diffDays = differenceInCalendarDays(new Date(), new Date(date));
    const dateKey = [0, 1, 2].includes(diffDays) ? ["today", "yesterday", "dayBeforeYesterday"][diffDays] : "";
    
    return dateKey ? t(`date.${dateKey}`) : format(new Date(date), "d MMMM yyyy", { 
      locale: language === "en" ? enUS : uk 
    });
  };

  const renderItem = useCallback(({ item, index }: { item: OrderHistoryByDate; index: number }) => {
    if (isLoading || !item) {
      return <SkeletonOrderHistoryList />;
    }
  
    return (
      <Animated.View
        entering={FadeInDown.delay(index * 100)}  
        style={{
          marginBottom: index === orderHistory.length - 1 ? 0 : 15
        }}
      >
        <Typography fontSize={16} fontWeight="bold" style={{ marginBottom: 5 }}>
          {transformToDateString(item.date)}
        </Typography>
  
        <View style={styles.historyList}>
          {item.orders.map((order, i) => (
            <Animated.View
              key={order.id}
              entering={FadeInDown.delay(index * 100 + i * 75)}
            >
              <OrderHistoryItem
                item={order}
                onViewDetails={() =>
                  router.push({
                    pathname: "/order/[orderId]",
                    params: { orderId: order.id },
                  })
                }
              />
            </Animated.View>
          ))}
        </View>
      </Animated.View>
    );
  }, [isLoading, orderHistory.length]);
  
  const renderFooter = useCallback(() => {
    if (isFetching && !isLoading) {
      return <ListLoader />;
    }
    return null;
  }, [isFetching, isLoading]);

  useEffect(() => {
    if (isConnected) {
      loadOrderHistory(true);
    }
    return () => resetOrderHistory();
  }, [isConnected]);  

  return (
    <ScreenWrapper hideStatusBarBorder>
      <Header
        title={t("screens.orderHistory.header.text")}
        titleSize={18}
        style={[
          styles.header,
          {
            minHeight: verticalScale(40),
          },
        ]}
      />
      
      <View style={styles.content}>
        {!isConnected && <ErrorNetwork />}

        {isConnected && isError && !isLoading && (
          <ErrorWithRetry
            message={t("screens.orderHistory.messages.error.text")}
            subMessage={t("screens.orderHistory.messages.error.subText")}
            buttonText={t("screens.orderHistory.buttons.error.text")}
            onRetry={() => loadOrderHistory(true)}
          />
        )}

        {isConnected && isEmpty && !isError && !isLoading && (
          <Empty
            message={t("screens.orderHistory.messages.empty.text")}
            subMessage={t("screens.orderHistory.messages.empty.subText")}
          />
        )}

        {isConnected && !isEmpty && !isError && (
          <FlatList
            data={isLoading ? Array(1) : orderHistory}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              isLoading ? `skeleton-${index}` : (item?.date || `item-${index}`)
            }
            contentContainerStyle={{
              padding: 15,
              gap: 10,
            }}
            refreshing={isRefreshing}
            onRefresh={refreshOrderHistory}
            onEndReached={
              orderHistoryHasMore ? loadMoreOrderHistory : undefined
            }
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
            scrollEnabled={isConnected}
          />
        )}
      </View>  
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    borderBottomColor: colors.grayTint7,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
  },
  content: {
    flex: 1,
  },
  historyList: {
    gap: 10,
  },
});

export default OrderHistoryScreen;
