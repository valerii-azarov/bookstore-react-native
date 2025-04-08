import { useOrdersStore } from "@/stores/ordersStore";

type OrdersStoreType = ReturnType<typeof useOrdersStore.getState>;

export const selectOrders = (state: OrdersStoreType) => state.orders;

export const selectResetOrders = (state: OrdersStoreType) => state.resetOrders;
