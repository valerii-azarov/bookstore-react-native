import { useNovaPostStore } from "@/stores/novaPostStore";

type NovaPostStoreType = ReturnType<typeof useNovaPostStore.getState>;

export const selectCities = (state: NovaPostStoreType) => state.cities;
export const selectWarehouses = (state: NovaPostStoreType) => state.warehouses;
export const selectFetchCitiesStatus = (state: NovaPostStoreType) => state.novaPostOperations.fetchCities.status;
export const selectFetchCitiesResponse = (state: NovaPostStoreType) => state.novaPostOperations.fetchCities.response;
export const selectFetchWarehousesStatus = (state: NovaPostStoreType) => state.novaPostOperations.fetchWarehouses.status;
export const selectFetchWarehousesResponse = (state: NovaPostStoreType) => state.novaPostOperations.fetchWarehouses.response;

export const selectSearchCities = (state: NovaPostStoreType) => state.searchCities;
export const selectSearchWarehouses = (state: NovaPostStoreType) => state.searchWarehouses;
export const selectSetNovaPostOperationState = (state: NovaPostStoreType) => state.setNovaPostOperationState;
export const selectResetNovaPostOperationState = (state: NovaPostStoreType) => state.resetNovaPostOperationState;
export const selectResetCities = (state: NovaPostStoreType) => state.resetCities;
export const selectResetWarehouses = (state: NovaPostStoreType) => state.resetWarehouses;
