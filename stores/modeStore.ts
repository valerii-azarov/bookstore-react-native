import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { asyncStorage } from "@/storages/asyncStorage"; // import { mmkvStorage } from "@/storages/mmkvStorage";
import { ModeType } from "@/types";

interface ModeState {
  mode: ModeType;
  toggleMode: () => void;
}

export const useModeStore = create<ModeState>()(
  devtools(
    persist(
      (set) => ({
        mode: "list",
        toggleMode: () => set((state) => ({ mode: state.mode === "list" ? "grid" : "list" })),
      }),
      {
        name: "mode-storage",
        storage: createJSONStorage(() => asyncStorage),
      }
    )
  )
);
