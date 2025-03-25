import { useModeStore } from "@/stores/modeStore";

type ModeStoreType = ReturnType<typeof useModeStore.getState>;

export const selectModes = (state: ModeStoreType) => state.modes;

export const selectSetMode = (state: ModeStoreType) => state.setMode;
export const selectToggleMode = (state: ModeStoreType) => state.toggleMode;
export const selectGetMode = (state: ModeStoreType) => state.getMode;
