import axios from "axios";
import { novaPostConfig } from "@/config/novaPost";
import { NovaPostCity, NovaPostWarehouse } from "@/types";

const BASE_URL = "https://api.novaposhta.ua/v2.0/json/";

export const novaPostApi = {
  getCities: async (search?: string): Promise<NovaPostCity[]> => {
    const response = await axios.post(BASE_URL, {
      apiKey: novaPostConfig.apiKey,
      modelName: "Address",
      calledMethod: "getCities",
      methodProperties: {
        FindByString: search || "",
        Limit: "50",
      },
    });

    if (!response.data.success) {
      throw new Error("NovaPostError: Failed to fetch cities (nova-post/cities-not-found)");
    }

    return response.data.data.map((city: any) => ({
      ref: city.Ref,
      description: city.Description,
    }));
  },

  getWarehouses: async (cityRef: string, search?: string): Promise<NovaPostWarehouse[]> => {
    const response = await axios.post(BASE_URL, {
      apiKey: novaPostConfig.apiKey,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityRef: cityRef || "",
        FindByString: search || "",
        Limit: "50",
      },
    });

    if (!response.data.success) {
      throw new Error("NovaPostError: Failed to fetch warehouses (nova-post/warehouses-not-found)");
    }

    return response.data.data.map((warehouse: any) => ({
      ref: warehouse.Ref,
      description: warehouse.Description,
      cityRef: warehouse.CityRef,
    }));
  },
};
