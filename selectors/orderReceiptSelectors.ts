import { useOrderReceiptStore } from "@/stores/orderReceiptStore";

type OrderReceiptStoreType = ReturnType<typeof useOrderReceiptStore.getState>;

export const selectReceipt = (state: OrderReceiptStoreType) => state.receipt;
export const selectReceiptStatus = (state: OrderReceiptStoreType) => state.receiptStatus;
export const selectReceiptResponse = (state: OrderReceiptStoreType) => state.receiptResponse;

export const selectSetReceiptById = (state: OrderReceiptStoreType) => state.setReceiptById;
export const selectLoadReceiptById = (state: OrderReceiptStoreType) => state.loadReceiptById;
export const selectResetReceipt = (state: OrderReceiptStoreType) => state.resetReceipt;
