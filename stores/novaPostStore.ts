import { create } from "zustand";
import { novaPostApi } from "@/api/novaPostApi";
import { messageHandler } from "@/helpers/messageHandler";
import { NovaPostCity, NovaPostWarehouse, StatusType, ResponseType } from "@/types";

interface NovaPostStore {
  cities: NovaPostCity[];
  warehouses: NovaPostWarehouse[];
  citiesStatus: StatusType;
  citiesResponse: ResponseType | null;
  warehousesStatus: StatusType;
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

    novaPostApi
      .getCities(search)
      .then((cities) => {
        set({
          cities,
          citiesResponse: { status: "success" },
          citiesStatus: "idle",
        });
      })
      .catch((error) =>
        set({
          citiesResponse: {
            status: "error",
            message: messageHandler.getErrorMessage(
              error.message, 
              {
                "nova-post/cities-not-found": "novaPost.citiesNotFound",
              }
            ),
          },
          citiesStatus: "idle",
        })
      );
  },

  searchWarehouses: async (cityRef: string, search?: string) => {
    set({ warehousesStatus: "loading", warehousesResponse: null });

    novaPostApi
      .getWarehouses(cityRef, search)
      .then((warehouses) => {
        set({
          warehouses,
          warehousesResponse: { status: "success" },
          warehousesStatus: "idle",
        });
      })
      .catch((error) =>
        set({
          warehousesResponse: {
            status: "error",
            message: messageHandler.getErrorMessage(
              error.message, 
              {
                "nova-post/warehouses-not-found": "novaPost.warehousesNotFound",
              }
            ),
          },
          warehousesStatus: "idle",
        })
      );
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
