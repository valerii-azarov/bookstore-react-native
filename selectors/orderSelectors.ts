import { useOrderStore } from "@/stores/orderStore";

type OrderStoreType = ReturnType<typeof useOrderStore.getState>;

export const selectOrder = (state: OrderStoreType) => state.order;
export const selectOrderStatus = (state: OrderStoreType) => state.orderStatus;
export const selectOrderResponse = (state: OrderStoreType) => state.orderResponse;

export const selectLoadOrderById = (state: OrderStoreType) => state.loadOrderById;
export const selectCreateOrder = (state: OrderStoreType) => state.createOrder;
export const selectResetOrder = (state: OrderStoreType) => state.resetOrder;
