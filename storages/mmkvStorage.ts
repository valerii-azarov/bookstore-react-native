import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

export const storage = new MMKV();

export const mmkvStorage: StateStorage = {
  setItem: async (key: string, value: string): Promise<void> => storage.set(key, value),

  getItem: async (key: string): Promise<string | null> => storage.getString(key) || null,

  removeItem: async (key: string): Promise<void> =>storage.delete(key),
};
