import { create } from "zustand";
import { NetInfoState, NetInfoStateType } from "@react-native-community/netinfo";

interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: NetInfoStateType;
  details: NetInfoState["details"];
  setNetworkState: (state: NetInfoState) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  isConnected: false,
  isInternetReachable: null,
  type: NetInfoStateType.unknown,
  details: null,

  setNetworkState: (state) => {
    set({
      isConnected: !!state.isConnected,
      isInternetReachable: state.isInternetReachable,
      type: state.type,
      details: state.details,
    });
  },
}));
