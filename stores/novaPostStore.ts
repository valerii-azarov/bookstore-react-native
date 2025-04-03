import { create } from "zustand";
import { novaPostApi } from "@/api/novaPostApi";
import { messageHandler } from "@/helpers/messageHandler";
import { NovaPostCity, NovaPostWarehouse, NovaPostCityStatusType, NovaPostWarehouseStatusType, ResponseType } from "@/types";

interface NovaPostStore {
  cities: NovaPostCity[];
  warehouses: NovaPostWarehouse[];
  citiesStatus: NovaPostCityStatusType;
  citiesResponse: ResponseType | null;
  warehousesStatus: NovaPostWarehouseStatusType;
  warehousesResponse: ResponseType | null;
  searchCities: (search: string) => Promise<void>;
  searchWarehouses: (cityRef: string, search?: string) => Promise<void>;
  resetCities: () => void;
  resetWarehouses: () => void;
}

export const useNovaPostStore = create<NovaPostStore>((set) => ({
  cities: [],
  warehouses: [],
  citiesStatus: "idle",
  citiesResponse: null,
  warehousesStatus: "idle",
  warehousesResponse: null,

  searchCities: async (search: string) => {
    set({ citiesStatus: "loading", citiesResponse: null });

    novaPostApi.getCities(search)
      .then((cities) => {
        set({
          cities,
          citiesStatus: "idle",
          citiesResponse: { status: "success" },
        });
      })
      .catch((error) =>
        set({
          citiesResponse: {
            status: "error",
            message: messageHandler.getErrorMessage(error, {
              "nova-post/cities-not-found": "novaPost.citiesNotFound",
            }),
          },
        })
      )
      .finally(() => set({ citiesStatus: "idle" }));
  },

  searchWarehouses: async (cityRef: string, search?: string) => {
    set({ warehousesStatus: "loading", warehousesResponse: null });

    novaPostApi.getWarehouses(cityRef, search)
      .then((warehouses) => {
        set({
          warehouses,
          warehousesStatus: "idle",
          warehousesResponse: { status: "success" },
        });
      })
      .catch((error) =>
        set({
          warehousesResponse: {
            status: "error",
            message: messageHandler.getErrorMessage(error, {
              "nova-post/warehouses-not-found": "novaPost.warehousesNotFound",
            }),
          },
        })
      )
      .finally(() => set({ warehousesStatus: "idle" }));
  },

  resetCities: () => {
    set({
      cities: [],
      citiesStatus: "idle",
      citiesResponse: null,
    });
  },

  resetWarehouses: () => {
    set({
      warehouses: [],
      warehousesStatus: "idle",
      warehousesResponse: null,
    });
  },

}));
