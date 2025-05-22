import { useOrdersStore } from "@/stores/ordersStore";

type OrdersStoreType = ReturnType<typeof useOrdersStore.getState>;

export const selectOrders = (state: OrdersStoreType) => state.orders;
export const selectOrdersLastDoc = (state: OrdersStoreType) => state.ordersLastDoc;
export const selectOrdersStatus = (state: OrdersStoreType) => state.ordersStatus;
export const selectOrdersResponse = (state: OrdersStoreType) => state.ordersResponse;
export const selectOrdersHasMore = (state: OrdersStoreType) => state.ordersHasMore;
export const selectSelectedStatuses = (state: OrdersStoreType) => state.selectedStatuses;

export const selectSetSelectedStatuses = (state: OrdersStoreType) => state.setSelectedStatuses;
export const selectLoadOrdersByStatuses = (state: OrdersStoreType) => state.loadOrdersByStatuses;
export const selectRefresh = (state: OrdersStoreType) => state.refresh;
export const selectLoadMore = (state: OrdersStoreType) => state.loadMore;
export const selectResetAll = (state: OrdersStoreType) => state.resetAll;
