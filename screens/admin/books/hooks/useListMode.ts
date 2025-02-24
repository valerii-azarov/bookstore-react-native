import { useState } from "react";
import { ModeType } from "@/types";

export interface ListModeReturn {
  mode: ModeType;
  toggleMode: () => void;  
}

export const useListMode = (initialMode: ModeType = "list"): ListModeReturn => {
  const [mode, setMode] = useState<ModeType>(initialMode);

  const toggleMode = () => {
    setMode((prev) => (prev === "list" ? "grid" : "list"));
  };

  return {
    mode,
    toggleMode,
  };
};