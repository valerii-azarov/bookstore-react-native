import { useOrderStore } from "@/stores/orderStore";

type OrderStoreType = ReturnType<typeof useOrderStore.getState>;

export const selectOrderId = (state: OrderStoreType) => state.orderId;
export const selectCurrentOrder = (state: OrderStoreType) => state.currentOrder;
export const selectFetchOrderStatus = (state: OrderStoreType) => state.orderOperations.fetch.status;
export const selectFetchOrderResponse = (state: OrderStoreType) => state.orderOperations.fetch.response;
export const selectCreateOrderStatus = (state: OrderStoreType) => state.orderOperations.create.status;
export const selectCreateOrderResponse = (state: OrderStoreType) => state.orderOperations.create.response;
export const selectUpdateStatusStatus = (state: OrderStoreType) => state.orderOperations.updateStatus.status;
export const selectUpdateStatusResponse = (state: OrderStoreType) => state.orderOperations.updateStatus.response;

export const selectSetOrderById = (state: OrderStoreType) => state.setOrderById;
export const selectLoadOrderById = (state: OrderStoreType) => state.loadOrderById;
export const selectCreateOrder = (state: OrderStoreType) => state.createOrder;
export const selectUpdateStatus = (state: OrderStoreType) => state.updateStatus;
export const selectSetOrderOperationState = (state: OrderStoreType) => state.setOrderOperationState;
export const selectResetOrderOperationState = (state: OrderStoreType) => state.resetOrderOperationState;
export const selectResetCurrentOrder = (state: OrderStoreType) => state.resetCurrentOrder;
