import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateStorage } from "zustand/middleware";

export const asyncStorage: StateStorage = {
  setItem: (key: string, value: string): Promise<void> => AsyncStorage.setItem(key, value),

  getItem: (key: string): Promise<string | null> => AsyncStorage.getItem(key),

  removeItem: (key: string): Promise<void> =>  AsyncStorage.removeItem(key),
};
