import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { asyncStorage } from "@/storages/asyncStorage"; // import { mmkvStorage } from "@/storages/mmkvStorage";
import { ModeType } from "@/types";

interface ModeState {
  modes: Record<string, ModeType>;
  setMode: (key: string, mode: ModeType) => void;
  toggleMode: (key: string) => void;
  getMode: (key: string) => ModeType;
}

export const useModeStore = create<ModeState>()(
  devtools(
    persist(
      (set, get) => ({
        modes: {},
        setMode: (key: string, mode: ModeType) =>
          set((state) => ({
            modes: { ...state.modes, [key]: mode },
          })),
        toggleMode: (key: string) =>
          set((state) => ({
            modes: {
              ...state.modes,
              [key]: state.modes[key] === "list" ? "grid" : "list",
            },
          })),
        getMode: (key: string) => get().modes[key] || "list",
      }),
      {
        name: "mode-storage",
        storage: createJSONStorage(() => asyncStorage),
      }
    )
  )
);
