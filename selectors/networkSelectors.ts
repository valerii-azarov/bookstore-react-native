import { useNetworkStore } from "@/stores/networkStore";

type NetworStoreType = ReturnType<typeof useNetworkStore.getState>;

export const selectIsConnected = (state: NetworStoreType) => state.isConnected;
export const selectIsInternetReachable = (state: NetworStoreType) => state.isInternetReachable;
export const selectType = (state: NetworStoreType) => state.type;
export const selectDetails = (state: NetworStoreType) => state.details;

export const selectSetNetworkState = (state: NetworStoreType) => state.setNetworkState;
