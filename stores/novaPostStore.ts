import { create } from "zustand";
import { novaPostApi } from "@/api/novaPostApi";
import { messageHandler } from "@/helpers/messageHandler";
import { NovaPostCity, NovaPostWarehouse, StatusType, ResponseType } from "@/types";

type NovaPostOperation = "fetchCities" | "fetchWarehouses";

type NovaPostOperationState = {
  status: StatusType;
  response: ResponseType | null;
};

interface NovaPostStore {
  cities: NovaPostCity[];
  warehouses: NovaPostWarehouse[];
  novaPostOperations: Record<NovaPostOperation, NovaPostOperationState>;
  searchCities: (search: string) => Promise<void>;
  searchWarehouses: (cityRef: string, search?: string) => Promise<void>;
  setNovaPostOperationState: (op: NovaPostOperation, state: Partial<NovaPostOperationState>) => void;
  resetNovaPostOperationState: (op: NovaPostOperation) => void;
  resetCities: () => void;
  resetWarehouses: () => void;
}

export const useNovaPostStore = create<NovaPostStore>((set) => ({
  cities: [],
  warehouses: [],
  novaPostOperations: {
    fetchCities: { status: "idle", response: null },
    fetchWarehouses: { status: "idle", response: null },
  },

  searchCities: async (search: string) => {
    set((state) => ({
      novaPostOperations: {
        ...state.novaPostOperations,
        fetchCities: { status: "loading", response: null },
      },
    }));

    novaPostApi
      .getCities(search)
      .then((cities) => 
        set((state) => ({
          cities,
          novaPostOperations: {
            ...state.novaPostOperations,
            fetchCities: {
              status: "idle",
              response: { status: "success" },
            },
          },
        }))
      )
      .catch((error) =>
        set((state) => ({
          novaPostOperations: {
            ...state.novaPostOperations,
            fetchCities: {
              status: "idle",
              response: { 
                status: "error", 
                message: messageHandler.getErrorMessage(
                  error.message, 
                  {
                    "nova-post/cities-not-found": "novaPost.citiesNotFound",
                  }
                ), 
              },
            },
          },
        }))
      );
  },

  searchWarehouses: async (cityRef: string, search?: string) => {
    set((state) => ({
      novaPostOperations: {
        ...state.novaPostOperations,
        fetchWarehouses: { status: "loading", response: null },
      },
    }));

    novaPostApi
      .getWarehouses(cityRef, search)
      .then((warehouses) => 
        set((state) => ({
          warehouses,
          novaPostOperations: {
            ...state.novaPostOperations,
            fetchWarehouses: {
              status: "idle",
              response: { status: "success" },
            },
          },
        }))
      )
      .catch((error) =>
        set((state) => ({
          novaPostOperations: {
            ...state.novaPostOperations,
            fetchWarehouses: {
              status: "idle",
              response: { 
                status: "error", 
                message: messageHandler.getErrorMessage(
                  error.message, 
                  {
                    "nova-post/warehouses-not-found": "novaPost.warehousesNotFound",
                  }
                ), 
              },
            },
          },
        }))
      );
  },

  setNovaPostOperationState: (op, stateUpdate) => {
    set((state) => ({
      novaPostOperations: {
        ...state.novaPostOperations,
        [op]: { ...state.novaPostOperations[op], ...stateUpdate },
      },
    }));
  },
  
  resetNovaPostOperationState: (op) => {
    set((state) => ({
      novaPostOperations: {
        ...state.novaPostOperations,
        [op]: { status: "idle", response: null },
      },
    }));
  },

  resetCities: () => {
    set((state) => ({
      cities: [],
      novaPostOperations: {
        ...state.novaPostOperations,
        fetchCities: { status: "idle", response: null },
      },
    }));
  },

  resetWarehouses: () => {
    set((state) => ({
      warehouses: [],
      novaPostOperations: {
        ...state.novaPostOperations,
        fetchWarehouses: { status: "idle", response: null },
      },
    }));
  },

}));
