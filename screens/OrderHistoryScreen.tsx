import React, { useEffect } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { enUS, uk } from "date-fns/locale";
import { View, FlatList } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { orderHandler } from "@/helpers/orderHandler";
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
  const status = useOrderHistoryStore(selectOrderHistoryStatus);
  const response = useOrderHistoryStore(selectOrderHistoryResponse);
  const hasMore = useOrderHistoryStore(selectOrderHistoryHasMore);
  
  const fetchData = useOrderHistoryStore(selectLoadOrderHistory);
  const loadMore = useOrderHistoryStore(selectLoadMoreOrderHistory);
  const refresh = useOrderHistoryStore(selectRefreshOrderHistory);
  const reset = useOrderHistoryStore(selectResetOrderHistory);

  const isLoading = status === "loading";
  const isFetching = status === "fetching";
  const isRefreshing = status === "refreshing";
  const isEmpty = !isLoading && orderHistory.length === 0;
  const isError = response?.status === "error";

  const transformToDateString = (date: string) => {
    const diffDays = differenceInCalendarDays(new Date(), new Date(date));
    const dateKey = [0, 1, 2].includes(diffDays) ? ["today", "yesterday", "dayBeforeYesterday"][diffDays] : "";
    
    return dateKey ? t(`common.date.${dateKey}`) : format(new Date(date), "d MMMM yyyy", { 
      locale: language === "en" ? enUS : uk 
    });
  };

  useEffect(() => {
    if (isConnected) {
      fetchData(true);
    }

    return () => reset();
  }, [isConnected]);

  const sectionDelayStep = 150;
  const itemDelayStep = 75;

  return (
    <ScreenWrapper hideStatusBarBorder>
      <Header
        title={t("screens.orderHistory.header.title")}
        titleSize={18}
        style={{ 
          minHeight: 40,
          backgroundColor: colors.white,
          borderBottomColor: colors.grayTint7,
          borderBottomWidth: 1,
          paddingHorizontal: 15,
        }}
      />
      
      <View style={{ flex: 1 }}>
        {!isConnected && (
          <ErrorNetwork 
            message={t("common.messages.errorNetwork.title")}
            subMessage={t("common.messages.errorNetwork.subtitle")}
          />
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
            message={t("screens.orderHistory.messages.empty.title")}
            subMessage={t("screens.orderHistory.messages.empty.subtitle")}
          />
        )}

        {isConnected && !isEmpty && !isError && (
          <FlatList
            data={isLoading ? Array(1) : orderHistory}
            renderItem={({ item, index }: { item: OrderHistoryByDate; index: number }) => {
              if (isLoading || !item) {
                return <SkeletonOrderHistoryList />;
              }
              
              const sectionDelay = index * (sectionDelayStep + item.orders.length * itemDelayStep);

              return (
                <Animated.View
                  key={`section-${item.date}`}
                  entering={FadeInDown.delay(sectionDelay)}
                  style={{
                    marginBottom: index === orderHistory.length - 1 ? 0 : 15
                  }}
                >
                  <Typography fontSize={16} fontWeight="bold" style={{ marginBottom: 5 }}>
                    {transformToDateString(item.date)}
                  </Typography>

                  <View style={{ flexDirection: "column", gap: 10 }}>
                    {item.orders.map((order, i) => (
                      <Animated.View
                        key={`order-${order.id}`}
                        entering={FadeInDown.delay(sectionDelay + i * itemDelayStep)}
                      >
                        <OrderHistoryItem
                          item={order}
                          onViewDetails={() =>
                            router.push({
                              pathname: "/order/[orderId]",
                              params: { orderId: order.id },
                            })
                          }
                          statusLabel={
                            orderHandler.getOrderStatusStyle(order.status, t).label
                          }
                          statusBackgroundColor={
                            orderHandler.getOrderStatusStyle(order.status, t).backgroundColor
                          }
                        />
                      </Animated.View>
                    ))}
                  </View>
                </Animated.View>
              );
            }}
            keyExtractor={(item, index) =>
              isLoading ? `skeleton-${index}` : (item?.date || `item-${index}`)
            }
            contentContainerStyle={{
              padding: 15,
              gap: 10,
            }}
            refreshing={isRefreshing}
            onRefresh={refresh}
            onEndReached={hasMore ? loadMore : undefined}
            onEndReachedThreshold={0.1}
            ListFooterComponent={isFetching ? <ListLoader /> : null}
            scrollEnabled={isConnected}
          />
        )}
      </View>  
    </ScreenWrapper>
  );
};

export default OrderHistoryScreen;
