import { useNovaPostStore } from "@/stores/novaPostStore";

type NovaPostStoreType = ReturnType<typeof useNovaPostStore.getState>;

export const selectCities = (state: NovaPostStoreType) => state.cities;
export const selectWarehouses = (state: NovaPostStoreType) => state.warehouses;
export const selectCitiesStatus = (state: NovaPostStoreType) => state.citiesStatus;
export const selectCitiesResponse = (state: NovaPostStoreType) => state.citiesResponse;
export const selectWarehousesStatus = (state: NovaPostStoreType) => state.warehousesStatus;
export const selectWarehousesResponse = (state: NovaPostStoreType) => state.warehousesResponse;

export const selectSearchCities = (state: NovaPostStoreType) => state.searchCities;
export const selectSearchWarehouses = (state: NovaPostStoreType) => state.searchWarehouses;
export const selectResetCities = (state: NovaPostStoreType) => state.resetCities;
export const selectResetWarehouses = (state: NovaPostStoreType) => state.resetWarehouses;
